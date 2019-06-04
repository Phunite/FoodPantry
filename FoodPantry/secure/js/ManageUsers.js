
$(document).ready(function () {

    var userTable = $("#userTable").DataTable({
        "fnDrawCallback": function (settings, json) {
            $('.tooltipper').tooltipster({
                theme: ['tooltipster-noir', 'tooltipster-noir-customized']
            });
        },
        "ajax": {
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "type": "POST",
            "url": "ManageUsers.aspx/GetUserData",
            "dataSrc": function (data) {

                var users = $.parseJSON(data.d);
                var dataSet = [];

                users.forEach(function (person) {
                    dataSet.push(person);
                });

                return dataSet;
            }
        },

        "columns": [
            { "title": "First Name", "data": "FirstName" },
            { "title": "Last Name", "data": "LastName" },
            { "title": "AccessNet ID", "data": "AccessNet" },
            { "title": "Role", "data": "Role" },
            {
                "title": "Status",
                "data": "Status",
                "render": function (data, type, row) {
                    if (data === "Active") {
                        return '<span class="badge badge-pill badge-success">Active</span>';
                    }
                    else if (data === "Inactive") {
                        return '<span class="badge badge-pill badge-warning">Inactive </span>';
                    }
                }
            },
            {
                "title": "Actions",
                "data": null,
                "render": function (data, type, row) {
                    return ''
                        + '<button type="button" class="tooltipper myBtnEdit userEdit" title="Edit Users"><i class="far fa-edit tableButton"></i></button>'
                        //+ '<button type="button" id="userEdit" class="btn btn-warning"><i class="material-icons tableButton" >create</i ></button>'
                        + '</div>';
                }
            }
        ],
        "initComplete": function (settings, json) {
            $('.tooltipper').tooltipster({
                theme: ['tooltipster-noir', 'tooltipster-noir-customized']
            });
        },


        //data: data,
        responsive: true,
        autoWidth: false,
        order: [[4, "asc"], [3, "asc"], [1, "asc"]],
        pageLength: -1,
        "lengthMenu": [[7, 10, 25, 50, -1], [7, 10, 25, 50, "All"]],

    });
    //Update User
    $('#userTable tbody').on('click', '#userEdit', function () {
        var table = $("#userTable").DataTable();
        var data = table.row($(this).parents('tr')).data();

        $(".modal-header").html("Manage User");

        $("#UpdateModalFooter").show();
        $("#AddModalFooter").hide();

        $("#txtFirstName").val(data["FirstName"]);
        $("#txtLastName").val(data["LastName"]);
        $("#txtAccessNet").val(data["AccessNet"]);
        $("#selRoles").val(data["Role"]);
        $("#selStatus").val(data["Status"]);

        modal.open();
        $("#modal").data("row", this);

    });
    $('#userTable tbody').on('click', '.userEdit', function () {
        var table = $("#userTable").DataTable();
        var data = table.row($(this).parents('tr')).data();

        $(".modal-header").html("Manage User");

        $("#UpdateModalFooter").show();
        $("#AddModalFooter").hide();

        $("#txtFirstName").val(data["FirstName"]);
        $("#txtLastName").val(data["LastName"]);
        $("#txtAccessNet").val(data["AccessNet"]);
        $("#selRoles").val(data["Role"]);
        $("#selStatus").val(data["Status"]);

        modal.open();
        $("#modal").data("row", this);

    });

    //Remove User
    $('#userTable tbody').on('click', '#userRemove', function () {
        var table = $("#userTable").DataTable();
        var data = table.row($(this).parents('tr')).data();

        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete this user!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonClass: 'btn btn-default',
            confirmButtonText: 'Delete',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                table.row($(this).parents('tr')).remove().draw();

                removeUser(data);

                $("#modal").data("row", this);

            }
        });
    });

    //Add User
    $("#btnAddUser").click(function (event) {

        $(".modal-header").html("Add User");

        $("#UpdateModalFooter").hide();
        $("#AddModalFooter").show();

        $("#txtFirstName").val("");
        $("#txtLastName").val("");
        $("#txtAccessNet").val("");
        $("#selRoles").val("");
        $("#selStatus").val("");

        modal.open();
        $("#modal").data("row", this);
    });

    $("#btnModalSave").click(function () {
        var table = $("#userTable").DataTable();
        var x = $("#modal").data().row;
        var row = table.row($(x).parents('tr'));
        var data = row.data();

        var user = {
            PersonID: data["PersonID"],
            FirstName: $("#txtFirstName").val(),
            LastName: $("#txtLastName").val(),
            AccessNet: $("#txtAccessNet").val(),
            Role: $("#selRoles").val(),
            Status: $("#selStatus").val()
        };

        data["FirstName"] = user.FirstName;
        data["LastName"] = user.LastName;
        data["AccessNet"] = user.AccessNet;
        data["Role"] = user.Role;
        data["Status"] = user.Status;

        updateUser(user);
    });


    $("#btnModalAdd").click(function () {
        var table = $("#userTable").DataTable();

        var firstName = $("#txtFirstName").val();
        var lastName = $("#txtLastName").val();
        var accessNet = $("#txtAccessNet").val();
        var role = $("#selRoles").val();
        var status = $("#selStatus").val();

        var user = { FirstName: firstName, LastName: lastName, AccessNet: accessNet, Role: role, Status: status };

        addUser(user);
    });

    var modal = new RModal(document.getElementById('modal'), {
        //content: 'Abracadabra'
        beforeOpen: function (next) {
            console.log('beforeOpen');
            $("*").removeClass("form-error");
            next();
        }
        , afterOpen: function () {
            console.log('opened');
        }

        , beforeClose: function (next) {
            console.log('beforeClose');
            // $("#userTable").DataTable().ajax.reload().draw();
            next();
        }
        , afterClose: function () {
            // $("#userTable").DataTable().ajax.reload().draw();

        }

        , escapeClose: true
    });

    window.modal = modal;
});


function addUser(user) {
    if (validateUser() === false) {
        return;
    }
    jQuery.ajax({
        type: "POST",
        url: "ManageUsers.aspx/AddUser",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user),
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (parseInt(result.d) > 0) {
                modal.close();
                $("#userTable").DataTable().ajax.reload().draw();

                return true;
            }

        },
        error: function (e) {
            console.log(e);
            return false;
        }
    });

}

function updateUser(user) {
    if (validateUser() === false) {
        return;
    }

    jQuery.ajax({
        type: "POST",
        url: "ManageUsers.aspx/UpdateUser",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user),
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (parseInt(result.d) > 0) {
                modal.close();
                $("#userTable").DataTable().ajax.reload().draw();
                return true;
            }

        },
        error: function (e) {
            console.log(e);
            return false;
        }
    });
}

function removeUser(data) {
    var sendData = '{"personID": "' + data.PersonID + '"}';

    jQuery.ajax({
        type: "POST",
        url: "ManageUsers.aspx/RemoveUser",
        contentType: "application/json; charset=utf-8",
        data: sendData,
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (parseInt(result.d) > 0) {
                modal.close();
                $("#userTable").DataTable().ajax.reload().draw();
                return true;
            }

        },
        error: function (e) {
            console.log(e);
            return false;
        }
    });
    $("#userTable").DataTable().ajax.reload().draw();
}
