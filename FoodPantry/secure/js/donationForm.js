$(document).ready(function () {

    $(":input").on('keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    $('.select2-Donor').select2({
        data: generateList(),
        tags: false,
        placeholder: {
            id: '-1',
            text: 'Insert Donor Name'
        }
    });

    $('.select2-Donor').on('select2:select', function (e) {
        var data = e.params.data;
        console.log(data);

        var donorList;

        jQuery.ajax({
            type: "POST",
            url: "Donation.aspx/GetReturningDonors",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var x = (result.d).replace("\\", "");
                var donors = JSON.parse(x);

                donorList = donors;
            },
            error: function (e) {
                console.log(e);
            }
        });

        $.each(donorList, function (index, item) {
            if (item.DonorID === parseInt(data.id)) {
                console.log(data.DonorID);
                $("#fname").val(item.FirstName);
                //$("#fname").attr('readonly', true);

                $("#lname").val(item.LastName);
                //$("#lname").attr('readonly', true);

                $("#donorType").val(item.DonorType);
                //$("#donorType").attr('readonly', true);
                //$("#donorType").prop("disabled", true);

                $("#emailAddress").val(item.Email);
                //$("#emailAddress").attr('readonly', true);

                $("#organization").val(item.Organization);
                //$("#organization").attr('readonly', true);

                $("#templeAffiliation").val(item.Affiliation);
                //$("#templeAffiliation").attr('readonly', true);
                //$("#templeAffiliation").prop("disabled", true);

                $("#tuid").val(item.TuId);
                //$("#tuid").attr('readonly', true);

                $("#donationType").val(0);
                $("#donationType").addClass("form-focus");
            }
        });
    });

    $("#donationType").change(function () {
        $("#donationType").blur();
        $("#donationType").removeClass("form-focus");

    });

    $("#btnClear").on('click', function (e) {
        clear();
        
    });

    $(":checkbox").change(function () {
        if (this.checked) {
            $("#txtSaveDonor").show();
        }
        else {
            $("#txtSaveDonor").hide();
        }

    });


    var maxlength = 250;

    $('textarea').keyup(function () {
        var length = $(this).val().length;
        length = maxlength - length;
        $('#chars').text(length);

    });

    function generateList(list) {
        var donorList;

        jQuery.ajax({
            type: "POST",
            url: "Donation.aspx/GetReturningDonors",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var x = (result.d).replace("\\", "");
                var donors = JSON.parse(x);

                donorList = donors;
            },
            error: function (e) {
                console.log(e);
            }
        });

        var data = [];

        $.each(donorList, function (index, item) {    //format into select2 format

            var donor = {};

            donor = {
                id: item.DonorID,
                text: item.SavedDonor
            };
            data.push(donor);

            //if (item.DonorType === 'Individual') {
            //    donor = {
            //        id: item.DonorID,
            //        text: item.FirstName + ' ' + item.LastName
            //    };
            //    data.push(donor);

            //}
            //else if (item.DonorType === 'Organization') {
            //    donor = {
            //        id: item.DonorID,
            //        text: item.Organization
            //    };
            //    data.push(donor);

            //}



        });
        data.unshift({  //add spot for placeholder
            id: -1,
            text: ''
        });
        return data;
    }

    var table = $("#donorTable").DataTable({
        "ajax": {
            "dataType": 'json',
            "contentType": "application/json; charset=utf-8",
            "type": "POST",
            "url": "Donation.aspx/GetReturningDonors",
            "dataSrc": function (data) {

                var x = (data.d).replace("\\", "");
                var donors = JSON.parse(x);
                var dataSet = [];

                donors.forEach(function (person) {
                    dataSet.push(
                        { SavedDonor: person.SavedDonor }
                    );
                });

                return dataSet;
            }
        },
        "columns": [
            { "title": "Saved Donor Name", "data": "SavedDonor" },
            {
                "title": "Actions",
                "data": null,
                "render": function (data, type, row) {
                    return ''
                        + '<button type="button" class="tooltipper myBtnEdit removeDonor" title="Remove Donor"><i class="far fa-trash-alt tableButton"></i></button>'
                        + '</div>';
                }
            }
        ],
        responsive: true,
        autoWidth: false,
        paging: false,
        bInfo: false,
        searching: false

    });

    $("#btnSavedDonors").on("click", function (e) {
        modal.open();
    });

    $('#donorTable tbody').on('click', '.removeDonor', function () {

        var data = table.row($(this).parents('tr')).data();
        Swal.fire({
            title: 'Are you sure?',
            text: "This will remove the donor from the saved donor list.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonClass: 'btn btn-default',
            confirmButtonText: 'Delete',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                removeDonor(data);
            }
        });

    });

    $("#btnModalDone").click(function () {
        modal.close();
    });

    $("#btnSubmitDonor").click(function () {
        if (validateDonation()) {

            var data = {
                firstName: $("#fname").val(),
                lastName: $("#lname").val(),
                donorType: $("#donorType").val(),
                donationType: $("#donationType").val(),
                email: $("#emailAddress").val(),
                organization: $("#organization").val(),
                templeAffiliation: $("#templeAffiliation").val(),
                tuID: $("#tuid").val(),
                donationDetail: $("#donationDetail").val(),
                savedDonor: $("#txtSaveDonor").val(),
                existingDonor: $("#selectDonor").val()
            };

            jQuery.ajax({
                type: "POST",
                url: "Donation.aspx/SubmitDonor",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(data),
                async: false,
                success: function (result) {
                    if (result.d === "true") {
                        Swal.fire(
                            'Success',
                            'Your donation was completed!',
                            'success'
                        );
                        clearForm();
                    }
                    else if (result.d === "Donor Name Exists") {
                        Swal.fire(
                            'An Error Has Occured',
                            'Saved Donor Name already exists.',
                            'error'
                        );
                    }
                    else {
                        Swal.fire(
                            'An Error Has Occured',
                            'There was an error proccessing your request. Please Try Again.',
                            'error'
                        );
                    } 
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
    });


    var modal = new RModal(document.getElementById('modal'), {
        //content: 'Abracadabra'
        beforeOpen: function (next) {
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

        }
        , escapeClose: true
    });

    window.modal = modal;
});

function removeDonor(data) {
    var sendData = '{"savedDonor": "' + data.SavedDonor + '"}';
    var table = $("#donorTable").DataTable();
    jQuery.ajax({
        type: "POST",
        url: "Donation.aspx/RemoveSavedDonor",
        contentType: "application/json; charset=utf-8",
        data: sendData,
        dataType: "json",
        success: function (result) {
            if (result !== "false") {
                console.log(result);
                table.row($(this).parents('tr')).remove().draw();
                table.ajax.reload().draw();
                $("#modal").data("row", this);
            }

        },
        error: function (e) {
            console.log(e);
            return false;
        }
    });
}

function clearForm(){
    $('.select2-Donor').val(null).trigger('change');

        $("#fname").val("");
        $("#fname").attr('readonly', false);

        $("#lname").val("");
        $("#lname").attr('readonly', false);

        $("#donorType").val(0);
        $("#donorType").attr('readonly', false);
        $("#donorType").prop("disabled", false);

        $("#donationType").val(0);
        $("#donationType").attr('readonly', false);
        $("#donationType").prop("disabled", false);


        $("#emailAddress").val("");
        $("#emailAddress").attr('readonly', false);

        $("#organization").val("");
        $("#organization").attr('readonly', false);

        $("#templeAffiliation").val(0);
        $("#templeAffiliation").attr('readonly', false);
        $("#templeAffiliation").prop("disabled", false);


        $("#tuid").val("");
        $("#tuid").attr('readonly', false);

        $("#donationDetail").val("");
        $("#donationDetail").attr('readonly', false);

        $(":input").removeClass("form-error");
}