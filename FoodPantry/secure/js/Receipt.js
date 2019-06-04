$(document).ready(function () {
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
                "drawCallback": function (settings, json) {
                    $('.tooltipper').tooltipster({
                        theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
                        //  contentCloning: false
                    });
                },
               
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
                        text: '<span"><i class="fa fa-file-pdf" style="color:red"></i> Pdf</span>',
                        className: 'btn btn-info',
                        title: 'Receipt_Data_export_PDF',
                        orientation: 'landscape',
                        'exportOptions': {
                            //columns: 'th:not(:last-child)'
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
                "initComplete": function (settings, json) {
                    $('.tooltipper').tooltipster({
                        theme: ['tooltipster-noir', 'tooltipster-noir-customized']
                    });
                    //    $.tooltipster.group('grouped');
                },

                //    $.tooltipster.group('grouped');
                "order": [[0, "desc"]],
                "pageLength": 25,
                "dom": 'B<"toolbar">flrtip',
                "lengthMenu": [[7, 10, 25, 50, -1], [7, 10, 25, 50, "All"]],
            });

            //      $('.tooltipper').tooltipster({
            //            theme: ['tooltipster-noir', 'tooltipster-noir-customized']
            //        });
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
                        //html += "<button class='btn btn-link btnPrint' id='print'>Print Receipt</button>";
                        html += "<div class='col - xs - 6 col - sm - 6 col - md - 6'>   <strong>" + data.CheckoutDate + "</strong> </div>";
                        //  html += "<div class='row'><div class='col - xs - 6 col - sm - 6 col - md - 6'> <address> Temple University</br> </address> </div>";
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
                            imageWidth: "5%",
                            imageHeight: "90%",
                            //    type: 'info',
                            html: html,
                            //footer: '<a href> Total Points: ' + totalPoints + '</a> ',
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

    //Print receipt
    $(document).on('click', "#print", function () {
        var divToPrint = document.getElementById("table-receipt");
        newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    });

});





