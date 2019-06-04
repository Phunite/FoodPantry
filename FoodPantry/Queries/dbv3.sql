

drop TABLE #temp

select c.Id,c.[Type],c.Packaging, i.Quantity
into #temp
from Category c
join Inventory i
on i.CategoryID = c.Id
order by c.Type, c.Packaging

drop table #Category
select distinct t.Id,t.Type, t.Packaging, a.CatQuant, a.ItemCount
into #Category
from #temp as t
join (
    select type, packaging, sum(quantity) as CatQuant, count(quantity) as ItemCount
    from #temp 
    group by type, packaging
) as a on t.TYPE = a.TYPE and t.packaging = a.packaging
order by Type, Packaging

drop table #inventory
select i.upc, i.CategoryID, c.catQuant, c.itemCount, i.weight, i.point 
into #inventory
from #Category c
join inventory i 
on c.Id  = i.CategoryID
order by CategoryID

select * from #inventory  order by CategoryID
-- select * from #category

return
--------------------------------------------------------------------------------
 --Checkout Item with UPC
 declare @upc varchar(50), @categoryID int
 set @upc = '075720481279'
 set @categoryID = (
        select categoryID from #inventory where upc like @upc
    )


update #inventory 
set catQuant = catQuant - 1 
where categoryID = @categoryID

update #category
set catQuant = catQuant - 1
where id = @categoryID

select * from #inventory where categoryID = @categoryID
select * from #category where id = @categoryID
return
------------------------------------------------------------------------------------
--Checkout item with Click

declare @catID int
set @catID = 6

update #inventory
set catQuant = catQuant -1 
where categoryID = @catID

update #category 
set catQuant = catQuant -1
where id = @catID



select * from #inventory where categoryID = @catID
select * from #category where id = @catID




