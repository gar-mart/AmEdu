CREATE FUNCTION Student.IsReFuelEligible (
	@studentId INT
	, @reservationDate DATE
)
RETURNS TABLE AS RETURN
(
	-- hack to remove eligibility requirements. To undo, remove the outer query.
	SELECT 
		a.StudentId
		, a.ReservationDate
	    , a.GradeRequirementMet
		, a.CanClaimOpenSpot
		, a.CanClaimStandbyPosition
		, 1 LiveLessonRequirementMet
		, 1 PassingClassesRequirementMet
		, a.ReservationRejectedRequirementMet
		, IIF(CanClaimStandbyPosition = 1 AND ReservationRejectedRequirementMet = 1 AND GradeRequirementMet = 1, 1, 0) AllRequirementsMet
		, a.BreakfastOffered
		, a.LunchOffered
		, a.GeneralInquiry
		, a.BreakfastInquiry
		, a.LunchInquiry
	FROM (
		SELECT u.Id StudentId
			, @reservationDate ReservationDate 
			, d.GradeRequirementMet
			, f.CanClaimOpenSpot
			, f.CanClaimStandbyPosition
			, h.LiveLessonRequirementMet
			, l.PassingClassesRequirementMet
			, n.ReservationRejectedRequirementMet
			, m.AllRequirementsMet
			, r.BreakfastOffered
			, r.LunchOffered
			, inq.GeneralInquiry
			, inq.BreakfastInquiry
			, inq.LunchInquiry
		FROM Common.Users u
		INNER JOIN Attendance.InterventionThresholds i ON u.GradeLevel = i.Grade
		LEFT JOIN Student.ReFuelReservations res ON u.Id = res.StudentId AND res.Date = @reservationDate
		CROSS APPLY (
			SELECT LastWeek = DATEADD(WK, -1, BeginningOfWeek)
				, EndLastWeek = BeginningOfWeek -- this would also be the week of the reservation date
			FROM Common.GetBeginningOfWeek(@reservationDate)
		) a
		LEFT JOIN Staff.ReFuelInquiries inq ON inq.Date BETWEEN DATEADD(DAY, -1, a.EndLastWeek) AND a.EndLastWeek
		CROSS APPLY (
			SELECT *
			FROM Staff.ReFuel
		) r
		CROSS APPLY (
			SELECT Monday = CAST(LastWeek AS DATE)
		) b
		CROSS APPLY (
			SELECT 
				CAST(BreakScale.Scale * CASE
					WHEN ClassCount.Value >= 6 THEN 1 -- 6+ classes = no scaling				
					ELSE ClassCount.Value / 6.0 -- scale out of 6
				END AS DECIMAL(7, 2)) Scale
			FROM (
				SELECT Scale = CAST((
					SELECT COUNT(*)
					FROM (
						SELECT Monday StartDate
						UNION ALL
						SELECT DATEADD(DAY, 1, Monday)
						UNION ALL
						SELECT DATEADD(DAY, 2, Monday)
						UNION ALL
						SELECT DATEADD(DAY, 3, Monday)
						UNION ALL
						SELECT DATEADD(DAY, 4, Monday)
					) ScaleDays
					WHERE 
						-- Scale points if there was a school break
						NOT EXISTS (SELECT * FROM Common.Breaks b WHERE ScaleDays.StartDate BETWEEN b.StartDate AND b.EndDate)
						-- Scale a student's points if they had an excused absence
						AND NOT EXISTS (SELECT * FROM Attendance.Absences WHERE ScaleDays.StartDate BETWEEN Absences.StartDate AND Absences.EndDate AND u.Id = Absences.UserId)
						-- Scale a student's points if they enrolled / unenrolled mid week (if they were not enrolled at all for this week then the Scale would be 0)
						AND ScaleDays.StartDate BETWEEN u.EnrollmentDate AND ISNULL(u.UnenrollmentDate, ScaleDays.StartDate)
				) AS DECIMAL(7,2)) / 5
			) BreakScale
			CROSS APPLY (
				SELECT COUNT(DISTINCT ccu.ClassId) Value
				FROM Attendance.vwCurrentClassUsers ccu
				WHERE ccu.UserId = u.Id
			) ClassCount
		) ScaleCalculation
		CROSS APPLY (
			SELECT GradeRequirementMet = IIF(
				u.GradeLevel IN ('6', '7', '8', '9', '10', '11', '12')
				, 1
				, 0
			)
		) d
		CROSS APPLY (
			SELECT SpotsClaimed = COUNT(*)
			FROM Student.ReFuelReservations
			WHERE [Date] = @reservationDate
				AND RejectReasonType IS NULL
		) e
		CROSS APPLY (
			SELECT 
				CanClaimOpenSpot = IIF(SpotsClaimed < r.MaxOpenPositions, 1, 0)
				, CanClaimStandbyPosition = IIF(SpotsClaimed < r.MaxOpenPositions + r.MaxStandbyPositions, 1, 0)
		) f
		CROSS APPLY (
			SELECT COUNT(*) LiveLessonPoints
			FROM Attendance.LiveLessonPoints c
			WHERE 
				c.UserId = u.Id
				AND c.Date >= LastWeek
				AND c.Date < DATEADD(WK, 1, LastWeek)
		) g
		CROSS APPLY (
			SELECT LiveLessonRequirementMet = IIF(
				CEILING(i.MinimumLiveLessons * ScaleCalculation.Scale) <= g.LiveLessonPoints
				, 1
				, 0
			)
		) h
		CROSS APPLY (
			SELECT ActiveClasses = COUNT(*)
			FROM Attendance.vwClasses b
			INNER JOIN Attendance.vwClassUsers c ON b.Id = c.ClassId AND c.Status = 1 -- active
			CROSS APPLY (
				-- get the most recent Score History record from last week
				SELECT TOP 1 *
				FROM Student.ScoreHistory d
				WHERE d.ClassId = c.ClassId
					AND c.UserId = d.StudentId
					AND CAST(AsOfDate AS DATE) BETWEEN LastWeek AND EndLastWeek 
				ORDER BY AsOfDate DESC
			) d
			WHERE c.UserId = u.Id			
				AND b.Name NOT LIKE '%Homeroom%'
				AND (
					b.StartDate <= LastWeek 
					AND EndLastWeek <= b.EndDate
					OR LastWeek <= b.StartDate
					AND b.StartDate <= EndLastWeek
					OR LastWeek <= b.EndDate
					AND b.EndDate <= EndLastWeek
				)
				AND (
					ISNULL(c.StartDate, LastWeek) <= LastWeek 
					AND EndLastWeek <= ISNULL(c.EndDate, EndLastWeek)
					OR LastWeek <= ISNULL(c.StartDate, LastWeek)
					AND ISNULL(c.StartDate, EndLastWeek) <= EndLastWeek
					OR LastWeek <= ISNULL(c.EndDate, LastWeek)
					AND ISNULL(c.EndDate, EndLastWeek) <= EndLastWeek
				)
				AND c.IsDeleted = 0
				AND b.IsDeleted = 0
				AND d.ScorePossible > 0
		) j
		CROSS APPLY (
			SELECT PassingClasses = COUNT(*)
			FROM Attendance.vwClasses b
			INNER JOIN Attendance.vwClassUsers c ON b.Id = c.ClassId
			CROSS APPLY (
				-- get the most recent Score History record from last week
				SELECT TOP 1 *
				FROM Student.ScoreHistory d
				WHERE d.ClassId = c.ClassId
					AND c.UserId = d.StudentId
					AND CAST(AsOfDate AS DATE) BETWEEN LastWeek AND EndLastWeek 
				ORDER BY AsOfDate DESC
			) d
			WHERE UserId = u.Id			
				AND b.Name NOT LIKE '%Homeroom%'
				AND (
					b.StartDate <= LastWeek 
					AND EndLastWeek <= b.EndDate
					OR LastWeek <= b.StartDate
					AND b.StartDate <= EndLastWeek
					OR LastWeek <= b.EndDate
					AND b.EndDate <= EndLastWeek
				)
				AND (
					ISNULL(c.StartDate, LastWeek) <= LastWeek 
					AND EndLastWeek <= ISNULL(c.EndDate, EndLastWeek)
					OR LastWeek <= ISNULL(c.StartDate, LastWeek)
					AND ISNULL(c.StartDate, EndLastWeek) <= EndLastWeek
					OR LastWeek <= ISNULL(c.EndDate, LastWeek)
					AND ISNULL(c.EndDate, EndLastWeek) <= EndLastWeek
				)
				AND c.IsDeleted = 0
				AND b.IsDeleted = 0
				AND d.ScorePossible > 0
				AND d.ScoreRatio >= 60
		) k
		CROSS APPLY (
			SELECT PassingClassesRequirementMet = IIF(PassingClasses = ActiveClasses OR PassingClasses >= 4, 1, 0)
		) l
		CROSS APPLY (
			SELECT ReservationRejectedRequirementMet = IIF(ISNULL(res.RejectReasonType, 0) > 0, 0, 1)
		) n	
		CROSS APPLY (
			SELECT AllRequirementsMet = IIF(
				d.GradeRequirementMet = 1
				AND f.CanClaimStandbyPosition = 1
				AND h.LiveLessonRequirementMet = 1
				AND l.PassingClassesRequirementMet = 1
				AND n.ReservationRejectedRequirementMet = 1
				, 1
				, 0
			)
		) m
		WHERE u.Id = @studentId
	) a
)
