-- Summary: 
--   Each week, staff can require responses for three types of inquiries: General, Breakfast, and Lunch when the student is making a ReFuel reservation.
--   The student's response will be stored on the Student.ReFuelReservation record and are implicitly mapped to this table.
CREATE TABLE Staff.ReFuelInquiries (
	[Date] DATE NOT NULL
	, GeneralInquiry NVARCHAR(500) NULL
	, BreakfastInquiry NVARCHAR(500) NULL
	, LunchInquiry NVARCHAR(500) NULL
	, CONSTRAINT PK_Staff_ReFuelInquiries PRIMARY KEY (Date)
)
