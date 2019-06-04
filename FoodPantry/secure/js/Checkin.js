var dataset = [
    //{ Upc: "123123123", Category: "Cat", Quantity: "2", Point: "3" }
];

$(document).ready(function () {

    $("#txtSearchUPC").val("");
    $("#txtSearchUPC").focus();
    var table = $("#cart-table").DataTable({
        "columns": [
            {
                "title": "UPC",
                "data": "Upc",

            },
            {
                "title": "Category",
                "data": "Category",
                "render": function (data, type, row) {
                    return '<span class="badge badge-pill badge-secondary">' + data + '</span>';
                }
            },
            {
                "title": "Packaging",
                "data": "Packaging"

            },
            {
                "title": "Quantity",
                "data": "Quantity",
                "render": function (data, type, row) {
                    return '<input type="text" class="quantity-text" value="' + data + '">';
                }
            },
            {
                "title": "Points",
                "data": "Point",
                "visible":false
            },
            {
                "title": "Subtotal",
                "data": null,
                "render": function (data, type, row) {
                    return data['Quantity'] * data['Point'];
                },
                "visible": false
            },
            {
                "title": "",
                "data": null,
                "render": function (data, type, row) {
                    return '<i class="far fa-trash-alt" id="imgRemove"></i>';
                },
                "visible": true
            }
        ],
        searching: false,
        paging: false,
        info: false,
        ordering: false,
        data: dataset,
        scrollX: false,
        responsive: false,
        autoWidth: false,

        initComplete: function () {
            this.api().columns.adjust().draw();
        },
        language: {
            "emptyTable": "You have not checked in any items yet. "
        },

        "drawCallback": function (settings) {
            var table = $("#cart-table").DataTable();
            var quantity = 0;
            var total = 0;
            table.rows().every(function (rowIdx, tableLoop, rowLoop) {
                var data = this.data();
                quantity += parseInt(data.Quantity);
                total += (data.Quantity * data.Point);


            });
            if (total > 10) { //CHANGE TO MAX POINT

            }
            else {
                $("#alert-wrapper")[0].innerHTML = "";
            }
            $("#totalItems")[0].innerHTML = quantity;
            //$("#totalPoints")[0].innerHTML = total;
        }
    });



    $("#txtSearchUPC").keydown(function (e) {
        var sendData = '{"search": "' + $("#txtSearchUPC").val() + '"}';

        var category = $("#selCategory").val("");
        var packaging = $("#selPackaging").val("");
        var weight = $("#weight").val("");
        var quantity = $("#txtQuantity").val("");
        var point = $("#txtPoint").val("");

        if (e.keyCode === 13) { //Search By UPC
            var upc = $("#txtSearchUPC").val();
            var upclength = upc.toString().length;

            if (upc === "") {
                Swal.fire({
                    type: 'warning',
                    title: 'Oops...',
                    text: 'Please scan a UPC.',
                    footer: 'You entered an empty value.'
                }).then((result) => {
                    $("#txtSearchUPC").val("");
                    $("#txtSearchUPC").focus();
                })
            }
            else {
                var sendDataUPC = '{"UPC": "' + upc + '"}';

                jQuery.ajax({
                    type: "POST",
                    url: "Checkout.aspx/getCategoryID",
                    contentType: "application/json; charset=utf-8",
                    data: sendDataUPC,
                    dataType: "json",
                    success: function (result) {
                        let searchItem = { CategoryID: result.d, UPC: upc };
                        searchProduct(searchItem);
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
            }
            return false; // prevent the button click from happening
        }

    });

 
    $("#btnClear").click(function () {
        clearCart("alert");
    });

    $("#btnCheckin").click(function () {
        checkin();
    });

    //Update Quantity
    $('body').on('focusout', '.quantity-text', function (e) {
        var table = $("#cart-table").DataTable();
        var data = table.row($(this).closest('tr')).data();
        var input = this.value;


        if (input === "" || isNaN(input)) {
            return;
        }
        else if (input === "0") {
            this.value = data.Quantity;
            return;
        }
        else {
            var maxPoint = parseInt($("#ContentPlaceHolder1_hfMaxPoint").val());
            //var currentPoint = parseInt($("#totalPoints")[0].innerHTML);

            if (input < data.Quantity) {
                input = input * -1;
            }

            //if (currentPoint + (data.Point * input) > maxPoint) {

            //}
            else {
                data.Quantity = input;
                table.row(data).cells().invalidate().draw();
                updateItem(data, input);
            }

        }
    });

    $('#cart-table tbody').on('click', '#imgRemove', function () {
        var data = table.row($(this).parents('tr')).data();

        table.row($(this).parents('tr')).remove().draw();

        removeItem(data["Upc"]);
    });


    $(document).keypress(
        function (event) {
            if (event.which === '13') {
                event.preventDefault();
            }
        }
    );

    $("#btnModalSave").on("click", function (event) {

        if (validateempty()) {
            var category = $("#selCategory").select2('data')[0].text;
            var packaging = $("#selPackaging").select2('data')[0].text;

            var categoryObj = {
                type: category,
                packaging: packaging
            };


            var categoryID = getcategoryid(categoryObj);

            var item = {
                Upc: $("#txtUPC").val(),
                Category: category,
                Packaging: packaging,
                Weight: $("#weight").val() + " " + $("#weightunit").val(),
                Quantity: $("#txtQuantity").val(),
                Point: $("#txtPoint").val(),
                CategoryID: categoryID
            };
            console.log(item);

            jQuery.ajax({
                type: "POST",
                url: "Checkout.aspx/AddToInventory",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(item),
                dataType: "json",
                success: function (result) {
                    console.table(item);
                    modal.close();
                    item.Category = category;
                    addItem(item);
                   // $("#selCategory").val('').trigger('change');
                },
                error: function (e) {
                    console.log(e);
                }
            });

            //var category = $("#selCategory").val("");
            //var packaging = $("#selPackaging").val("");
            //var weight = $("#weight").val("");
            //var quantity = $("#txtQuantity").val("");
            //var point = $("#txtPoint").val("");
        }

       
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

    $('.select2-packaging').on('select2:select', function (e) {
        var category = $("#selCategory").select2('data')[0].text;
        var packaging = $("#selPackaging").select2('data')[0].text;

        if ($(".select2-category").val() != "-1") {
            var quant = getPointValue(category, packaging);
            if (quant != "false" && quant != "") {
                $("#txtPoint").val(quant);
                $("#txtPoint").attr('readonly', true);

            }
            else {
                $("#txtPoint").val("");
                $("#txtPoint").attr('readonly', false);
            }
        }
    });

    $('.select2-category').on('select2:select', function (e) {
        var category = $("#selCategory").select2('data')[0].text;
        var packaging = $("#selPackaging").select2('data')[0].text;

        if ($(".select2-packaging").val() != "-1") {
            var quant = getPointValue(category, packaging);
            if (quant != "false" && quant != "") {
                $("#txtPoint").val(quant);
                $("#txtPoint").attr('readonly', true);

            }
            else {
                $("#txtPoint").val("");
                $("#txtPoint").attr('readonly', false);
            }
        }
    });

   

    var modal = new RModal(document.getElementById('modal'), {
        //content: 'Abracadabra'
        beforeOpen: function (next) {
            console.log('beforeOpen');
            $("#txtCategory").val("").removeClass("error");
            $("#txtPackaging").val("").removeClass("error");
            $("#weight").val("").removeClass("error");
            $("#txtQuantity").val("").removeClass("error");
            $("#txtPoint").val("").removeClass("error");
            $("#txtPoint").val("");
            $("#txtPoint").attr('readonly', false);
            $(".modal-error")[0].innerHTML = "";
            next();
        }
        , afterOpen: function () {
            console.log('opened');
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

    $("#menu-toggle").click(function (e) {
        let sidebarwrapper = document.getElementById("sidebar-wrapper");
        if (sidebarwrapper.classList.contains("sidebar-hide")) {
            document.getElementById("pos-checkin").style.width = "89%";

        }
        else {
            document.getElementById("pos-checkin").style.width = "76%";

        }

        e.preventDefault();
        //}


    });
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
}

//Inputs a UPC code and sends to db to check if item is in inventory
//Ouput: Sends item object to recordItem()
function searchProduct(searchItem) {
    var sendData = '{"Id": "' + searchItem.CategoryID + '"}';

    $("#txtSearchUPC").val("");
    jQuery.ajax({
        type: "POST",
        url: "Checkout.aspx/CheckInventory",
        contentType: "application/json; charset=utf-8",
        data: sendData,
        dataType: "json",
        success: function (result) {
            var x = (result.d).replace("\\", "");
            var item = JSON.parse(x);
            item.searchedUPC = searchItem.UPC;
            console.log(item);
            proccessItem(item);
            //var pointCount = $("#totalPoints")[0].innerHTML;
            //var itemCount = $("#totalItems")[0].innerHTML;

            //$("#totalPoints")[0].innerHTML = parseInt(pointCount) + item.Point;
            //$("#totalItems")[0].innerHTML = parseInt(itemCount) + 1;
        },
        error: function (e) {
            console.log(e);
        }
    });
}


function proccessItem(item) {
    var table = $("#cart-table").DataTable();
    var maxPoint = parseInt($("#ContentPlaceHolder1_hfMaxPoint").val());
    //var currentPoint = parseInt($("#totalPoints")[0].innerHTML);


    if (item.Category === "Item Not Found") {
        console.log("Item Not Found -- UPC: " + item.searchedUPC + ", Category: " + item.Category);
        modal.open();
        $("#txtUPC").val(item.searchedUPC);
        return;
    }

    //if (currentPoint + item.Point > maxPoint) {
        
    //}
    else {
        addItem(item);
    }
}

function addItem(item) {
    var found = false;
    var table = $("#cart-table").DataTable();

    //Checks if item is already in table and if so incriments the quantity
    table.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var d = this.data();

        if (d['Upc'] === item.Upc) {
            var quantity = parseInt(d['Quantity']);
            d['Quantity'] = quantity + 1;
            this.cells().invalidate().draw();
            found = true;
        }
        return;
    });
    if (found === false) {
        var data = { Upc: item.Upc, Category: item.Category, Packaging: item.Packaging, Quantity: 1, Point: item.Point, CategoryID: item.CategoryID };
        table.row.add(data).draw();

    }
    var e = jQuery.Event("keydown");
    e.which = 8;
    $("#txtSearchUPC").trigger(e);
    $("#txtSearchUPC").focus();

}

//Send new Item to DB
function saveItem(item) {
    //recordItem(item);

    jQuery.ajax({
        type: "POST",
        url: "Checkout.aspx/AddToInventory",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(item),
        dataType: "json",
        success: function (result) {
            var item = JSON.parse(result.d);
            processItem(item);
        },
        error: function (e) {
            console.log(e);
        }
    });
}


function checkin() {
    var table = $("#cart-table").DataTable();

    var itemList = [];

    table.rows().every(function (rowIdx, tableLoop, rowLoop) {
        var data = this.data();
        var itemData = {
            CategoryID: data.CategoryID,
            Quantity: data.Quantity,

        };
        console.log(itemData);
        itemList.push(itemData);
    });

    var data = {
        "ItemCount": $("#totalItems")[0].innerHTML,
        //"PointCount": $("#totalPoints")[0].innerHTML,
        "itemList": itemList
    };


    Swal.fire({
        title: 'Are you sure?',
        text: "This will Check-in all your items!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Check-in!'
    }).then((result) => {
        if (result.dismiss === "cancel") {
            return;
        }
        jQuery.ajax({
            type: "POST",
            url: "CheckinScan.aspx/Checkin",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            dataType: "json",
            success: function (result) {
                switch (result.d) {
                    case "No Items":
                        Swal.fire({
                            title: "Check-in",
                            text: "There are no items in your inventory review. Please first scan an item.",
                            type: "warning"
                        });
                        break;
                    case "error":
                        Swal.fire({
                            title: "Check-in",
                            text: "There was an error checking in your inventory review. Please try again.",
                            type: "error"
                        });
                        break;
                    default:
                        Swal.fire({
                            title: "Check-in",
                            text: "Your inventory has been checked-in!",
                            type: "success"
                        });
                        console.log("Inventory checked-in - Cart ID: " + result.d);
                        clearCart("no alert");
                }


            },
            error: function (e) {
                console.log(e);
            }
        });
    });
}

function clearCart(flag) {
    var table = $("#cart-table").DataTable();

    if (flag === "no alert") {
        table.clear().draw();
        return;
    }
    Swal.fire({
        title: 'Are you sure?',
        text: "This will empty your inventory review.",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, clear!'
    }).then((result) => {
        if (result.dismiss === "cancel") {
            return;
        }
        jQuery.ajax({
            type: "POST",
            url: "Checkout.aspx/ClearCart",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                //if (result.d === "Cart Cleared") {
                //    Swal.fire({
                //        title: "Cart Cleared",
                //        text: "Your cart has been cleared.",
                //        type: "success"
                //    });
                table.clear().draw();
            },
            error: function (e) {
                console.log(e);
            }
        });
    });
}

function updateItem(data, input) {
    var table = $("#cart-table").DataTable();
    var sendData = '[{"UPC": "' + data.Upc + '"},{"quantity": "' + input + '"}';

    var item = {
        UPC: data.Upc,
        quantity: input
    };

    jQuery.ajax({
        type: "POST",
        url: "Checkout.aspx/UpdateCartItem",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(item),
        dataType: "json",
        success: function (result) {
            console.log(result);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

var category = [];
var test = $.ajax({
    method: "POST",
    url: "Inventory.aspx/GetCategory",
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (categorydata) {
        var x = (categorydata.d).replace("\\", "");
        var categories = JSON.parse(x);
        categories.forEach(function (item) {
            if (item.Packaging === "") {
                category.push("<option>" + item.Type + "</option>");
            }
            else if (item.Packaging !== "") {
                category.push("<option>" + item.Type + ", " + item.Packaging + "</option>");
            }
        });

    },
    error: function (e) {
        console.log(e);
    }
});

function getcategory() {
    var list = "";
    list = category.join();
    return list;
};

function getcategoryid(categoryitem) {
    var result;

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

function splitcategory(category) {

    if (category.indexOf(',') > -1) {
        let arr = category.split(", ");
        categoryitem = {
            type: arr[0],
            packaging: arr[1]
        }
        console.log(categoryitem);
        return categoryitem;
    }
};
function getPointValue(category, packaging) {
    //var sendData = '[{"category": "' + category + '"},{"packaging": "' + packaging + '"}';
    var point = "false";

    jQuery.ajax({
        type: "POST",
        url: "Checkout.aspx/getPointValue",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ category: category, packaging: packaging }),
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.d != "Not Found") {
                point = result.d;
            }
            else {
                point = "false";
            }
        },
        error: function (e) {
            console.log(e);
        }
    });

    return point;
}

function additempopup() {




    const { value: formValues } = Swal.fire({
        title: 'Add New Item',
        text: "Add a new item",
        type: 'info',
        html:
            "<div class='input-group w-100 p-3'><div class='input-group-prepend' style='width:30%;'><span class='input-group-text w-100'>UPC</span></div><input id='upc' type='text' class='form-control' readonly aria-label='UPC' value='' ></input></div> " +
            "<div class='input-group w-100 p-3'><div class='input-group-prepend' style='width:30%;'><label class='input-group-text w-100' for=inputGroupCategory'>Category</label></div><select class='custom-select select2-category' id='inputGroupCategory'><option selected></option>" + getcategory() + "</select></div> " +
            "<div class='input-group w-100 p-3'><div class='input-group-prepend' style='width:30%;'><span class='input-group-text w-100'>Weight</span></div><input id='weight' type='text' class='form-control' aria-label='Weight' value='' ></input><div class='input-group-append'><select class='form-control' id='weightunit'><option>oz</option><option>g</option><option>Kg</option><option>fl oz</option></select></div ></div>" +
            "<div class='input-group w-100 p-3'><div class='input-group-prepend' style='width:30%;'><span class='input-group-text w-100'>Point</span></div><input id='point' type='text' class='form-control' aria-label='Point' value='' ></input></div>" +
            "<div class='input-group w-100 p-3'><div class='input-group-prepend' style='width:30%;'><span class='input-group-text w-100'>Quantity</span></div><input id='quantity' type='text' class='form-control' aria-label='Quantity' value='' ></input></div> ",

        showCancelButton: true,
        confirmButtonColor: '#8bc34a',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('upc').value,
                document.getElementById('inputGroupCategory').value,
                document.getElementById('weight').value,
                document.getElementById('weightunit').value,
                document.getElementById('point').value,
                document.getElementById('quantity').value,
            ];
        },
        onOpen: function (modal) {
            //$('.select2-category').select2();
            $('.select2-category').select2({
                placeholder: "Select a Category",
                allowClear: true
            });
        }

    }).then((formValues) => {
        if (formValues.value) {
            //if confirm is clicked
            Swal.fire(
                'Saved',
                'Your changes had been made!',
                'success'
            )
                        
            var categoryobj = splitcategory(formValues.value[1]);
            var categoryid = getcategoryid(categoryitem);

            console.log(categoryobj);
            console.log(categoryid);

            var item = {
                Upc: formValues.value[0],
                Category: categoryid,
                Weight: formValues.value[2] + " " + formValues.value[3],
                Point: formValues.value[4],
                Quantity: formValues.value[5]
            };

            console.log(item);
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
    })
};

