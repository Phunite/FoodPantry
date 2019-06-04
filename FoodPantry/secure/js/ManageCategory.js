$(document).ready(function () {

    var categoryTable = $("#categoryTable").DataTable({
        "fnDrawCallback": function (settings, json) {
            $('.tooltipper').tooltipster({
                theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            });
            $.tooltipster.group('grouped');
        },



        "ajax": {
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "type": "POST",
            "url": "ManageCategories.aspx/GetCategoryData",
            "dataSrc": function (data) {
                var categories = $.parseJSON(data.d);
                var dataSet = [];
                categories.forEach(function (category) {
                    dataSet.push(category);
                });

                return dataSet;
            }
        },
        "columns": [
            { "title": "Category Name", "data": "Type" },
            { "title": "Packaging", "data": "Packaging" },
            {
                "title": "Actions",
                "data": null,
                "render": function (data, type, row) {
                    return '<button type="button"  class=" tooltipper grouped myBtnEdit catEdit" title="Edit Category"><i class="far fa-edit tableButton"></i></button>  '
                        + '<button type="button" class="tooltipper grouped myBtnEdit catRemove" title ="Remove Cateogry"><i class="far fa-trash-alt tableButton"></i></button>'
                    //+ '</div>';
                }
            }
        ],
        "initComplete": function (settings, json) {
            $('.tooltipper').tooltipster({
                theme: ['tooltipster-noir', 'tooltipster-noir-customized']
            });
            $.tooltipster.group('grouped');
        },


        //data: data,
        responsive: true,
        autoWidth: false,
        pageLength: 25,
        "lengthMenu": [[7, 10, 25, 50, -1], [7, 10, 25, 50, "All"]],

    });


    //Show Update Category Modal
    $('#categoryTable tbody').on('click', '.catEdit', function () {
        var table = $("#categoryTable").DataTable();
        var data = table.row($(this).parents('tr')).data();

        $(".modal-header").html("Manage Category");

        $("#UpdateModalFooter").show();
        $("#AddModalFooter").hide();

        $("#txtCategoryName").val(data["Type"]);
        $("#txtPackaging").val(data["Packaging"]);

        $("#selPackageType").select2().val(data["Packaging"]).trigger("change");


        modal.open();
        $("#modal").data("row", this);

    });

    //Show Remove Category Alert
    $('#categoryTable tbody').on('click', '.catRemove', function () {
        var table = $("#categoryTable").DataTable();
        var data = table.row($(this).parents('tr')).data();

        $(".modal-header").html("Manage Category");

        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete this category!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonClass: 'btn btn-default',
            confirmButtonText: 'Delete',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                table.row($(this).parents('tr')).remove().draw();
                removeCategory(data.Id);
                $("#modal").data("row", this);
            }
        });
    });

    //Show Add Category Modal
    $("#btnAddCategory").click(function (event) {

        $(".modal-header").html("Add Category");

        $("#UpdateModalFooter").hide();
        $("#AddModalFooter").show();

        $("#txtCategoryName").val("");
        $("#txtPackaging").val("");

        modal.open();
        $("#modal").data("row", this);

    });



    //Update Category Save Click Event
    $("#btnModalSave").click(function () {
        table = $("#categoryTable").DataTable();
        x = $("#modal").data().row;
        row = table.row($(x).parents('tr'));
        data = row.data();

        var category = {
            Type: $("#txtCategoryName").val(),
            Packaging: $("#selPackageType").select2('data')[0].text,
            ID: data["Id"]
        };

        data["Type"] = category.Type;
        data["Packaging"] = category.Packaging;

        if (updateCategory(category)) {
            row.cells().invalidate().draw();
            modal.close();
        }


    });

    //Add Category Save Click Event
    $("#btnModalAdd").click(function () {
        table = $("#categoryTable").DataTable();
        let cat = $("#txtCategoryName").val();
        let packaging = $("#selPackageType").select2('data')[0].text;


        var category = {
            Type: cat.trim(),
            Packaging: packaging.trim(),
            Id: 0
        };

        if (addCategory(category)) {
            table.row.add(category).draw();
            modal.close();
        }

    });

    $('.select2-package').select2({
        data: generateList(),
        tags: true,
        placeholder: {
            id: '-1', // the value of the option
            text: 'Type Product Packaging'
        }
    });



    var modal = new RModal(document.getElementById('modal'), {
        //content: 'Abracadabra'
        beforeOpen: function (next) {
            $("#error_package")[0].innerHTML = "";
            $("#error_category")[0].innerHTML = "";
            $("*").removeClass("form-error");
            console.log('beforeOpen');
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
            $(".select2-package").select2().val("-1").trigger("change");
            $("#categoryTable").DataTable().ajax.reload().draw();

        }

        , escapeClose: true
    });

    window.modal = modal;
});

//get and format select2 data
function generateList(list) {
    var packageList;

    jQuery.ajax({
        type: "POST",
        url: "ManageCategories.aspx/getPackagesList",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            var x = (result.d).replace("\\", "");
            var packages = JSON.parse(x);

            packageList = packages;
        },
        error: function (e) {
            console.log(e);
        }
    });

    var data = [];

    $.each(packageList, function (index, item) {    //format into select2 format

        var cat = {
            id: item, //change based on what data is required
            text: item
        };

        data.push(cat);

    });
    data.unshift({  //add spot for placeholder
        id: -1,
        text: ''
    });
    return data;
}

function addCategory(category) {
    if (validateCategory() === false) {
        return;
    }

    console.log(category);
    jQuery.ajax({
        type: "POST",
        url: "ManageCategories.aspx/AddCategory",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(category),
        dataType: "json",
        success: function (result) {
            console.log(result);
            var status = parseInt(result.d);

            if (status > 0) {
                modal.close();
                $("categoryTable").DataTable().ajax.reload();
                return true;
            }
            else if (status === -1) {
                modal.close();
                Swal.fire({
                    title: "Could Not Add Category",
                    text: "This category already exits.",
                    type: "warning"
                });
            }

        },
        error: function (e) {
            console.log(e);
            return false;
        }
    });
}

function updateCategory(category) {

    if (validateCategory() === false) {
        return;
    }

    console.log(category);

    jQuery.ajax({
        type: "POST",
        url: "ManageCategories.aspx/UpdateCategory",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(category),
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (parseInt(result.d) > 0) {
                modal.close();
                $("#categoryTable").DataTable().ajax.reload().draw();
                return true;
            }

        },
        error: function (e) {
            console.log(e);
            return false;
        }
    });
}

function removeCategory(id) {
    var table = $("#categoryTable").DataTable();
    //var data = $(row).data();

    var sendData = '{"Id": "' + id + '"}';

    jQuery.ajax({
        type: "POST",
        url: "ManageCategories.aspx/RemoveCategory",
        contentType: "application/json; charset=utf-8",
        data: sendData,
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (parseInt(result.d) > 0) {
                modal.close();
                //$("#categoryTable").DataTable().ajax.reload();
                //table.row($(row).parents('tr')).remove().draw();
                return true;
            }

        },
        error: function (e) {
            console.log(e);
            return false;
        }
    });
}