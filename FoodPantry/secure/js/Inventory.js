$(document).ready(function () {
       var category = [];
    var package = [];

    var getcat = $.ajax({
        method: "POST",
        url: "Inventory.aspx/GetCategory",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (categorydata) {
            var x = (categorydata.d).replace("\\", "");
            var categories = JSON.parse(x);
            categories.forEach(function (item) {

                category.push("<option>" + item.Type + "</option>");
            });

        },
        error: function (result) {
            console.log(result);
        }
    });

    var getcat = $.ajax({
        method: "POST",
        url: "Inventory.aspx/GetPackaging",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (categorydata) {
            var x = (categorydata.d).replace("\\", "");
            var categories = JSON.parse(x);
            categories.forEach(function (item) {
                package.push("<option>" + item.Packaging + "</option>");
            });

        },
        error: function (result) {
            console.log(result);
        }
    });

    function getcategory() {
        var list = "";
        list = category.join();
        return list;
    };

    function getpackaging() {
        var list = "";
        list = package.join();
        return list;
    };



    var table = $('#inventory-datatable').DataTable({ 

        "ajax": {
            "type": "POST",
            "url": "Inventory.aspx/GetAllItems",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "dataSrc": function (data) {
                var items = $.parseJSON(data.d);
                var dataset = [];

                items.forEach(function (item) {
                    dataset.push(item);
                });

                return dataset;
            }
        },
        "columns": [
            { 'data': 'Upc' },
            { 'data': 'Category' },
            { 'data': 'Packaging' },
            {
                'data': 'Quantity',
                'render': function (data, type, row, meta) {
                    if (data < 0) {
                        return '<span class="badge badge-pill badge-secondary">Quantity Required</span>';
                    }
                    return data;
                },
            },
            { 'data': 'Weight' },
            { 'data': 'Point' },
            {
                "data": null,
                "visible": $('#hfRole').val() === "Admin",
                "defaultContent": "<button class='myBtnEdit tooltipper' title='Edit Item Details' onclick='return false;'><i class='far fa-edit'></i></button>"
            }
        ],
        
        "rowCallback": function (row, data) {
            if (data.Quantity < 0) {
                $(row).addClass("important");
                data.Quantity = "Item's Quantity Required";
                //$('td:eq(3)', row).innerText("hello");                

                //$('td:eq(3)', row).addClass("important");
            }
        },
        "createdCell": function (td, cellData, rowData, row, col) {
            if (data.Quantity < 0) {
                $('td:eq(3)', row).innerHTML("Item's Quantity Required");                
            }
        },
        "order": [[3, "desc"]],
        "pageLength": 25,
        "dom": 'B<"toolbar">flrtip',
        "lengthMenu": [[7, 10, 25, 50, -1], [7, 10, 25, 50, "All"]],

        "drawCallback": function (settings, json) {
            $('.tooltipper').tooltipster({
                theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            });
        },
        buttons: [
            {
                extend: 'csv',
                text: '<span><i class="fas fa-file-csv"></i> CSV</span>',
                className: 'btn btn-info',
                title: 'Inventory_Data_export_CSV',
                'exportOptions': {
                    columns: [0, 1, 2, 3, 4, 5]
                },

            },
            {
                extend: 'excel',
                text: '<span><i class="fa fa-file-excel"></i> Excel</span>',
                className: 'btn btn-info',
                title: 'Inventory_Data_export_Excel',
                'exportOptions': {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'pdf',
                text: '<span"><i class="fa fa-file-pdf" style="color:red"></i> Pdf</span>',
                className: 'btn btn-info',
                title: 'Inventory_Data_export_PDF',
                orientation: 'landscape',
                'exportOptions': {
                    //columns: 'th:not(:last-child)'
                    columns: [0, 1, 2, 3, 4, 5]
                }
            }
        ],
        initComplete: function () {
            $("div.toolbar").addClass("row");  
            $("div.toolbar").after("<div class='row' id='exportrow'></div>");

         //   $("#dataTables_wrapper dataTables_length select").addClass("tooltipper");
         //   $('#dataTables_wrapper dataTables_length select').prop('title', 'Select to display more items');
            this.api().columns([1]).every(function () {
                var column = this;
                var spanheader = $("<div class='col-lg-4 col-md-6 col-sm-12 d-flex justify-content-start' id='catselect'><span style='padding-right:5px;'>Filter Category </span></div>").appendTo($("div.toolbar"));
                var select = $("<select class='tooltipper custom-select custom-select-sm form-control form-control-sm' title='Filter through different Categories' id='catFilter'><option value=''>Select Category</option></select></div>")
                    .appendTo($("#catselect"))
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column.search(val ? '^' + val + '$' : '', true, false).draw();
                    });


                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });

                $('.tooltipper').tooltipster({
                    theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
                    contentAsHTML: 'true',
                    side: 'bottom'
                });
            });

            this.api().columns([2]).every(function () {
                var column = this;
                var spanheader = $("<div class='col-lg-4 col-md-6 col-sm-12 d-flex justify-content-start' id='pacselect'><span style='padding-right:5px;'>Filter Packaging </span></div>").appendTo($("div.toolbar"));
                var select = $("<select class='tooltipper custom-select custom-select-sm form-control form-control-sm ' title='Filter through different Packaging' id='packFilter'><option value=''>Select Packaging</option></select></div>")
                    .appendTo($("#pacselect"))
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column.search(val ? '^' + val + '$' : '', true, false).draw();
                    });


                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });

                $('.tooltipper').tooltipster({
                    theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
                    contentAsHTML: 'true',
                    side: 'bottom'
                });
            });
            this.api().columns([5]).every(function () {
                var column = this;
                var spanheader = $("<div class='col-lg-4 col-md-6 col-sm-12 d-flex justify-content-start ' id='ptselect'><span style='padding-right:5px;'>Filter Point Value </span></div>").appendTo($("div.toolbar"));
                var select = $("<select class='tooltipper custom-select custom-select-sm form-control form-control-sm ' title='Filter through different Point Value' id='ptFilter'><option value=''>Select Point Value</option></select></div>")
                    .appendTo($("#ptselect"))
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column.search(val ? '^' + val + '$' : '', true, false).draw();
                    });


                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });

                $('.tooltipper').tooltipster({
                    theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
                    contentAsHTML: 'true',
                    side: 'bottom'
                });
            });


            
        },
        
    });

    function getcategoryid(categoryitem) {
        var result = null;

        $.ajax({
            method: "POST",
            async: false,
            url: "CheckinScan.aspx/getCategoryId",
            data: JSON.stringify(categoryitem),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (categorydata) {
                var x = (categorydata.d).replace("\\", "");
                data = JSON.parse(x);
                result = data;
                console.log(data);
            },
            error: function (e) {
                console.log(e);
            }
        });

        console.log(result);
        return result;
    }

    var categoryitem = null;

    function combinecategory(itemtype, itempackaging) {
        categoryitem = {
            type: itemtype,
            packaging: itempackaging
        }
        return categoryitem;
    }


    $('#inventory-datatable tbody').on('click', 'button', function () {
        var data = $('#inventory-datatable').DataTable().row($(this).parents('tr')).data();
        var weightvalue = null;
        var weightunit = null;

        if (data.Weight === "n/a") {
            weightvalue = "";
        }
        else {
            var weightinfo = data.Weight.split(' ');
            weightvalue = weightinfo[0];
            weightunit = weightinfo[1];
        }
        modal.open();
        $("#txtUPC").val(data.Upc);
        console.log(data);
        $('#selCategory').val(data.Category);
        $('#selCategory').trigger('change');
        $('#selPackaging').val(data.Packaging);
        $('#selPackaging').trigger('change');
        $("#txtQuantity").val(data.Quantity);
        $("#weight").val(weightvalue);
        $("#weightunit").val(weightunit);
        $("#txtPoint").val(data.Point);
        $("#btnModalCancel").focus();


    });

    $("#btnModalSave").on("click", function (event) {

        if (validateemptyinventory()) {

            var weightval = $("#weight").val();
            var weight = null;
            if (weightval === "") {
                weight = "n/a";
            }
            else {
                weight = weightval + " " + $("#weightunit").val();
            }

            var item = {
                Upc: $("#txtUPC").val(),
                Category: $('#selCategory').val(),
                Packaging: $('#selPackaging').val(),
                Weight: weight,
                Point: $("#txtPoint").val(),
                Quantity: $("#txtQuantity").val()
            };

            console.log(item);
            $.ajax({
                type: "POST",
                url: "Inventory.aspx/UpdateItem",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(item),
                dataType: "json",
                success: function (result) {
                    //response will return the value you assigned while returning on success call of ajax.
                    //uncomment below if you want the datatable to reload at a time interval
                    //changed = true;
                    $('#inventory-datatable').DataTable().ajax.reload();
                    modal.close();
                    Swal.fire(
                        'Saved',
                        'Your changes had been made!',
                        'success'
                    )
                    //tooltip to remind refresh page for datatable category filter
                },
                error: function (e) {
                    // reponse will return server side error message.
                    console.log(e);
                }
            });
        }


    });

    //uncomment below if you want the datatable to reload at a time interval
    //reload every 30sec interval
    //setInterval(function () {
    //    if (changed) {
    //        $('#inventory-datatable').DataTable().ajax.reload();
    //        alert("changed");
    //    };
    //}, 1000);

    $('#tabletoggle').change(function () {
        var table = $('#inventory-datatable').DataTable();

        if ($(this).is(':checked')) {

            table.ajax.url("Inventory.aspx/GetAvailableItems").load();
        } else {
            table.ajax.url("Inventory.aspx/GetAllItems").load();
        }
           
    });

    $("#btnAddItem").click(function () {
        document.location.href = '/secure/CheckinScan.aspx'
  
    });

    $('.select2-category').select2({
        data: generateCategoryList(),
        placeholder: 'select..'

    });

    $('.select2-packaging').select2({
        data: generatePackageList(),
        placeholder: 'select..',
        tags: true
    });

    var modal = new RModal(document.getElementById('modal'), {
        beforeOpen: function (next) {
            console.log('beforeOpen');
            $("#txtCategory").val("").removeClass("error");
            $("#txtPackaging").val("").removeClass("error");
            $("#txtWeight").val("").removeClass("error");
            //$("#txtQuantity").val("").removeClass("error");
            $("#txtPoint").val("").removeClass("error");
            $(".modal-error")[0].innerHTML = "";
            next();
        }
        , afterOpen: function () {
            console.log('opened');
            $("#btnModalCancel").focus();
        }

        , beforeClose: function (next) {
            console.log('beforeClose');
            next();
        }
        , afterClose: function () {
            // $("input").val("");
            $('.select2').select2().val("").trigger("change");
        }

        , escapeClose: true
    });

    window.modal = modal;
  
    //setTimeout($('#inventory-datatable').DataTable().draw(), 1000);

});

function addNewItem(item) {
    jQuery.ajax({
        type: "POST",
        url: "Inventory.aspx/AddToInventory",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(item),
        dataType: "json",
        success: function (result) {
            var item = JSON.parse(result.d);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

$(window).bind("load", function () {
    

});

function generateCategoryList() {
    var list;

    jQuery.ajax({
        type: "POST",
        url: "CheckinScan.aspx/getCategoryList",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            var x = result.d.replace("\\", "");
            var items = JSON.parse(x);
            list = items;
        },
        error: function (e) {
            console.log(e);
        }
    });

    return formatSelect2List(list);
}

function generatePackageList() {
    var list;

    jQuery.ajax({
        type: "POST",
        url: "CheckinScan.aspx/getPackagesList",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            var x = result.d.replace("\\", "");
            var items = JSON.parse(x);
            list = items;
        },
        error: function (e) {
            console.log(e);
        }
    });

    return formatSelect2List(list);
}

function formatSelect2List(list) {
    var dataSet = [];

    $.each(list, function (index, item) {    //format into select2 format

        var data = {
            id: item, //change based on what data is required
            text: item
        };

        dataSet.push(data);

    });

    dataSet.unshift({  //add spot for placeholder
        id: -1,
        text: ''
    });

    return dataSet;
};

