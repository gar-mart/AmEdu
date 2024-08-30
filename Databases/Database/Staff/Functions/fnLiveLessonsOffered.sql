CREATE FUNCTION Staff.fnLiveLessonsOffered (
	@studentId INT
	, @startDate DATE
	, @endDate DATE
)
RETURNS @returntable TABLE
(
	ClassId INT
	, Date DATE
)
AS
BEGIN
	INSERT @returntable
	SELECT llp.ClassId, llp.Date
	FROM Attendance.LiveLessonPoints llp
	WHERE CAST(llp.Date AS DATE) BETWEEN @startDate AND @endDate
		AND llp.ClassId IN (
			-- only include classes that the user is enrolled in
			SELECT cu.ClassId
			FROM Attendance.vwClassUsers cu
			INNER JOIN Common.Users u ON cu.UserId = u.Id
			WHERE cu.UserId = @studentId
				AND cu.IsDeleted = 0
				AND (
					u.EnrollmentDate IS NULL
					OR CAST(llp.Date AS DATE) BETWEEN u.EnrollmentDate AND ISNULL(u.UnenrollmentDate, llp.Date)
				)
				AND (
					-- make sure the user was enrolled in this class for this time period (they might have disenrolled from the class or something)
					ISNULL(cu.StartDate, @startDate) <= @startDate 
					AND @endDate <= ISNULL(cu.EndDate, @endDate)
					OR @startDate <= ISNULL(cu.StartDate, @startDate)
					AND ISNULL(cu.StartDate, @endDate) <= @endDate
					OR @startDate <= ISNULL(cu.EndDate, @startDate)
					AND ISNULL(cu.EndDate, @endDate) <= @endDate
				)
		)
		AND NOT EXISTS (
			-- exclude live lessons that the user was excused (note, we are not also checking school breaks because there should be no live lessons offered on those days anyway)
			SELECT *
			FROM Attendance.Absences a
			WHERE a.UserId = @studentId
				AND CAST(llp.Date AS DATE) BETWEEN a.StartDate AND a.EndDate
		)
	GROUP BY llp.ClassId, llp.Date
	RETURN
END
