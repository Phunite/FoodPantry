SELECT * FROM dbo.Inventory WHERE CategoryID = 64

SELECT * FROM dbo.Category ORDER BY Type

select c.id, t.* 
INTO #tempCat
from dbo.Category c
join (
    select type, Packaging, count(*) as qty
    from dbo.Category
    group by Type, Packaging
    having count(*) > 1
) t on c.Type = t.Type and c.Packaging = t.Packaging

DELETE FROM dbo.Category WHERE EXISTS  (
SELECT * FROM #tempCat)

WITH CTE AS 
(SELECT *,RN=ROW_NUMBER() OVER(PARTITION BY type,Packaging ORDER BY id) 
 FROM #tempCat)
SELECT FROM CTE WHERE RN>1


SELECT * FROM dbo.Category

with R as (
select *, row_number() over(partition by id, Type, Packaging order by (select null)) as rn
from dbo.Category
)
SELECT R
where rn > 1

DROP TABLE #tempCat
SELECT * INTO #tempCat FROM dbo.Category

DROP TABLE dbo.Inventory

SELECT * 
FROM inv