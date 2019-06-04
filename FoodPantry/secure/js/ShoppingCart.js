$(document).ready(function () {
    var table = $('#example').DataTable({
        "ajax": "data/cartObject.txt",
        //'data': [
        //    {
        //        'thumbnail': '',
        //        'upcCode': '123456789111',
        //        'description': 'Peanut Butter',
        //        'quantity': '1',
        //        'pointValue': '2',
        //        //'delete': 'X',
        //    },
        //    {
        //        'thumbnail': '',
        //        'upcCode': '987654321632',
        //        'description': 'Soup',
        //        'quantity': '2',
        //        'pointValue': '3',
        //        //'delete': 'X',
        //    },
        //],
        "columns": [
            { "data": "thumbnail" },
            { "data": "upcCode" },
            { "data": "description" },
            { "data": "quantity" },
            { "data": "pointValue" },
            //{ 'data': 'delete' },
            {
                "data": null,
                "defaultContent": "<button style='btn btn-primary' onclick='return false;'>Edit/Delete</button>"
            }
        ]
    });
    $('#example tbody').on('click', 'button', function () {
        let data = table.row($(this).parents('tr')).data();
        alert("UPC: " + data.upcCode + "\n" + "Description: " + data.description + "\n" + "Quantity: " + data.quantity + "\n" + "Point Value: " + data.pointValue);
    });
});