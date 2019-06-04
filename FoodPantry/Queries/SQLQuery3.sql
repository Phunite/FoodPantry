SELECT *, c.ID
FROM dbo.Items i 
JOIN Category c
ON i.Category = c.Type
WHERE Category Like 'Water%'


WITH CTE AS(
   SELECT UPC, Category,
       RN = ROW_NUMBER()OVER(PARTITION BY Category ORDER BY Category)
   FROM dbo.Items
)
DELETE FROM CTE WHERE RN > 1

SELECT Category FROM Items WHERE CategoryID IS NULL

DROP TABLE inventory

SELECT x.* 
INTO Inventory
FROM (
Select UPC, CategoryID,
SUBSTRING(Category, 1,Charindex(',', Category)-1) as Category,
Substring(Category, Charindex(',', Category)+1, LEN(Category)) as  Packaging,
[Weight],[Point],[Quantity],[Image],Last_Update_User,Last_Update_Date
from Items 
WHERE Category LIKE '%,%'
UNION
SELECT upc, CategoryID, category, '' AS Packaging, [Weight],[Point],[Quantity],[Image],Last_Update_User,Last_Update_Date
FROM dbo.Items
WHERE Category NOT LIKE '%,%'
)x




update dbo.Inventory 
SET CategoryID=
	(
	SELECT Id 
	FROM Category 
	WHERE dbo.Inventory.Category=Category.[Type]
		AND dbo.Inventory.Packaging = Category.Packaging 
	);
SELECT * FROM dbo.Inventory

TRUNCATE TABLE category
INSERT INTO Category ([Type], Packaging)
(SELECT category, packaging FROM dbo.Inventory)


SELECT * FROM dbo.Inventory WHERE CategoryID = 6