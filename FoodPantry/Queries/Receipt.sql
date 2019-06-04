SELECT r.ReceiptID, r.PersonID, r.TotalPoints, r.TotalQuality, r.CheckoutDate, i.UPC, it.Category,it.Point, it.[Weight]
FROM dbo.Receipt r
LEFT OUTER JOIN dbo.ItemCheckedOut i ON r.ReceiptID = i.ReceiptID
JOIN dbo.Items it ON i.UPC = it.UPC
WHERE r.ReceiptID = 19