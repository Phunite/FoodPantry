drop TABLE #temp

select c.Id,c.[Type],c.Packaging, i.Quantity
into #temp
from Category c
join Inventory i
on i.CategoryID = c.Id
order by c.Type, c.Packaging

--SELECT * FROM #temp ORDER BY id

drop table #Category
select distinct t.Id,t.Type, t.Packaging, a.Quantity, a.TypeCount
into #Category
from #temp as t
join (
    select type, packaging, sum(quantity) as Quantity, count(quantity) as TypeCount
    from #temp 
    group by type, packaging
) as a on t.TYPE = a.TYPE and t.packaging = a.packaging
order by Type, Packaging

--SELECT * FROM #Category

SELECT * FROM dbo.Inventory
drop table #inventory
select i.upc, i.CategoryID, c.Quantity, c.TypeCount, i.Weight, i.point 
into #inventory
from #Category c
join inventory i 
on c.Id  = i.CategoryID
order by CategoryID

select *  INTO Inventory FROM #inventory  order by CategoryID
SELECT * FROM #inventory ORDER BY CategoryID


INSERT INTO Inventory (UPC, CategoryID, Quantity, TypeCount, Weight, Point)

SELECT * FROM #inventory
SELECT * INTO Cat  FROM #Category
SELECT * FROM dbo.Cat
-- select * from #category

SELECT * INTO #cat FROM cat
SELECT * INTO #category2 FROM dbo.Category
SELECT * INTO Category FROM #cat
RETURN

SELECT * FROM dbo.Category
SELECT * FROM dbo.Inventory

	SELECT i.UPC, c.Type, c.Packaging, c.Quantity, i.Weight, i.Point
	FROM dbo.Inventory i
	JOIN dbo.Category c
	ON i.CategoryID = c.Id

SELECT id, quantity 
INTO Quantity
FROM dbo.Category