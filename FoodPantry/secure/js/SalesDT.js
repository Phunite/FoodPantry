
$(document).ready(function () {
    
    // Ajax call to grab data for sales datatable
    $.ajax({
        method: "POST",
        url: "Sales.aspx/GetAllReceipts",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
            
            
            var x = (data.d).replace("\\", "");
            var item = JSON.parse(x);
            $('#content').html(item);
            var table = $('#receiptDatatable').DataTable({
                // Add event listeners to the two range filtering inputs
               
                //Redraw tool tip on pagination
                "drawCallback": function (settings, json) {
                    $('.tooltipper').tooltipster({
                        theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
                    });
                },
                dom: 'lBfrtip',
                //Export options
                buttons: [
                    {
                        extend: 'csv',
                        text: '<span><i class="fas fa-file-csv"></i> CSV</span>',
                        className: 'btn btn-info',
                        title: 'Receipt_Data_export_CSV',
                        'exportOptions': {
                            columns: [0, 1, 2, 3, 4, 5]
                        },

                    },
                    {
                        extend: 'excel',
                        text: '<span><i class="fa fa-file-excel"></i> Excel</span>',
                        className: 'btn btn-info',
                        title: 'Receipt_Data_export_Excel',
                        'exportOptions': {
                            columns: [0, 1, 2, 3, 4, 5]
                        }
                    },
                    {
                        extend: 'pdf',
                        text: '<span"><i class="fa fa-file-pdf" style="color:red"></i> PDF</span>',
                        className: 'btn btn-info',
                        title: 'Receipt_Data_export_PDF',
                        orientation: 'landscape',
                        'exportOptions': {
                            columns: [0, 1, 2, 3, 4, 5]
                        }
                    }
                ],          
                data: item,

                "columns": [
                    { "data": "ReceiptID" },
                    { "data": "LastName" },
                    { "data": "FirstName" },
                    { "data": "CheckoutDate" },
                    { "data": "TotalQuantity" },
                    { "data": "TotalPoints" },         

                    {
                        "data": null,
                        "defaultContent": "<button class='myBtnEdit tooltipper' title='Click to see receipt details' onclick='return false;'><i class='far fa-file-alt'></i></button>"

                    }

                ],
                //initalize tooltip
                "initComplete": function (settings, json) {
                    $('.tooltipper').tooltipster({
                        theme: ['tooltipster-noir', 'tooltipster-noir-customized']
                    });
                    $('#min').keyup(function () { table.draw(); });
                    $('#max').keyup(function () { table.draw(); });
                },
                "order": [[0, "desc"]],
                //Show row entry count for datatable
                "lengthMenu": [[7, 10, 25, 50, -1], [7, 10, 25, 50, "All"]],
                "pageLength": 7
            });
          
            //View receipt
            $('#receiptDatatable tbody').on('click', 'button', function () {
                let data = table.row($(this).parents('tr')).data();
                let order = data.ReceiptID;

                var sendData = '{"order": "' + order + '"}';


                jQuery.ajax({
                    type: "POST",
                    url: "Sales.aspx/GetReceipt",
                    contentType: "application/json; charset=utf-8",
                    data: '{"orderNumber": "' + order + '"}',
                    dataType: "json",
                    success: function (result) {

                        var x = (result.d).replace("\\", "");
                        var order = JSON.parse(x);
                        var html = "<div class='row'>  <div class='well col-xs - 10 col - sm - 10 col - md - 6 col - xs - offset - 1 col - sm - offset - 1 col - md - offset - 3'>";              
                        html += "<div class='col - xs - 6 col - sm - 6 col - md - 6'>   <strong>" + data.CheckoutDate + "</strong> </div>";
                        html += "<div class='text - center'>   </div>  </span> <table class='table table-hover' id='table-receipt'> <thead> <tr>"
                            + "<th>Category</th> <th>Packaging</th> <th>Quantity</th> <th>Point</th> <th>Total</th>";
                        html += "</tr> </thead> <tbody>";
                        var totalPoints = 0;
                        order.forEach(function (item) {
                            html += "<tr>"
                              
                                + "<td class='col-md-1'>" + item.Category + "</td>"
                                + "<td class='col-md-1'>" + item.Packaging + "</td>"
                                + "<td class='col-md-1 text-center'>" + item.Quantity + "</td>"
                                + "<td class='col-md-1' style='text-align: center'>" + item.Point + "</td>"
                                + "<td class='col-md-2' style='text-align: center'>" + item.Point * item.Quantity + "</td></tr>";
                            totalPoints += (item.Point * item.Quantity);
                        });
                        html +=
                            "<tr><td></td><td></td><td></td><td></td>"
                            + "<td>" + totalPoints + " points</td> </tr>";
                        html += "</tbody> </table></td>";
                        html += "<button class='btn btn-link btnPrint' id='print'>Print Receipt</button>";

                        Swal.fire({
                            title: '<strong><u>Receipt</u></strong>',
                            imageUrl: "./images/cherrypantrycherry.png",
                            imageHeight: "120px", 
                            html: html,
                            showCloseButton: true,
                            customClass: "swal"
                        });
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });

                return false;
            });



        }

    });
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var min = $('#min').datepicker("getDate");
            var max = $('#max').datepicker("getDate");
            var startDate = new Date(data[3]);
            if (min == null && max == null) { return true; }
            if (min == null && startDate <= max) { return true; }
            if (max == null && startDate >= min) { return true; }
            if (startDate <= max && startDate >= min) { return true; }
            return false;
        }

    );
    $("#min").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });
    $("#max").datepicker({ onSelect: function () { table.draw(); }, changeMonth: true, changeYear: true });
   // var table = $('#receiptDatatable').DataTable();
    $('#min, #max').change(function () {
        table.draw();
    });
   

   
    //Print receipt
    $(document).on('click', "#print", function () {
        var divToPrint = document.getElementById("table-receipt");
        newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    });

});





