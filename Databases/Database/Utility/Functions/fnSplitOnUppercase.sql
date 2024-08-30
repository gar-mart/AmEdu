CREATE FUNCTION Utility.fnSplitOnUppercase(@temp NVARCHAR(MAX))
RETURNS NVARCHAR(MAX)
AS
BEGIN

    DECLARE @KeepValues AS NVARCHAR(50) = '%[^ ][A-Z]%'
    While PatIndex(@KeepValues collate Latin1_General_Bin, @temp) > 0
        Set @temp = Stuff(@temp, PatIndex(@KeepValues collate Latin1_General_Bin, @temp) + 1, 0, ' ')

    Return @temp
End