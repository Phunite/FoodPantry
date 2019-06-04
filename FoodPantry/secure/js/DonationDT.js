$(document).ready(function () {
    $('.select2-DonorType').select2({
        data: generateDonorList(),
        placeholder: 'select..',


    });
    $('.select2-DonationType').select2({
        data: generateDonationList(),
        placeholder: 'select..',
    });

    var modal = new RModal(document.getElementById('modal'), {
        beforeOpen: function (next) {
            console.log('beforeOpen');
            $("#txtCategory").val("").removeClass("error");
            $("#txtPackaging").val("").removeClass("error");
            $("#txtWeight").val("").removeClass("error");
            $("#txtPoint").val("").removeClass("error");
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

    function generateDonorList() {
        var list;

        jQuery.ajax({
            type: "POST",
            url: "DonationHistory.aspx/GetDonorType",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var x = result.d.replace("\\", "");
                var items = JSON.parse(x);
                list = items;
                //alert(list);
            },
            error: function (e) {
                console.log(e);
            }
        });

        return formatSelect2List(list);
    }
    function generateDonationList() {
        var list;

        jQuery.ajax({
            type: "POST",
            url: "DonationHistory.aspx/GetDonationType",
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
    var table = $('#donation-datatable').DataTable({
        "ajax": {
            "type": "POST",
            "url": "DonationHistory.aspx/GetDonationInfo",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "dataSrc": function (data) {
                var donations = $.parseJSON(data.d);
                var dataset = [];

                donations.forEach(function (donation) {
                    dataset.push(donation);
                });

                console.log(dataset);
                return dataset;
            }
        },
        "columns": [
            { 'data': 'DonationID' },
            { 'data': 'DonorID' },
            { 'data': 'DonorOrgs' },
            { 'data': 'DonorLN' },
            { 'data': 'DonorFN' },
            { 'data': 'DonorEmail' },
            { 'data': 'DonorType' },
            { 'data': 'DonationType' },
            {
                'data': 'DonationDate',
                'type': 'datetime',
                'format': 'M/D/YYYY',
            },
            { 'data': 'DonationDetail' },
            {
                "data": null,
                "defaultContent": "<button id='btnDetails' class='myBtnEdit' onclick='return false;'><i class='fas fa-list'></i></button>"
            },
            {
                "data": null,
                "visible" : $("#hfRole").val() === "Admin",
                "defaultContent": "<button button id='myBtnEdit' class='myBtnEdit' onclick='return false;'><i class='far fa-edit'></i></button>" +
                    "<button id='myBtnDelete' class='myBtnEdit' onclick='return false;'><i class='far fa-trash-alt'></i></button>"
            }
        ],
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [1],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [9],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [8],
                "type": 'date',
                "format": 'M/D/YYYY'
            }
        ],

        "buttons": [
            {
                extend: 'csv',
                text: '<span><i class="fas fa-file-csv"></i> CSV</span>',
                className: 'btn btn-info',
                title: 'Donation_Data_export_CSV',
                'exportOptions': {
                    columns: [2, 3, 4, 5, 6, 7, 8, 9]
                },

            },
            {
                extend: 'excel',
                text: '<span><i class="fa fa-file-excel"></i> Excel</span>',
                className: 'btn btn-info',
                title: 'Donation_Data_export_Excel',
                'exportOptions': {
                    columns: [2, 3, 4, 5, 6, 7, 8, 9]
                }
            },
            {
                extend: 'pdf',
                text: '<span"><i class="fa fa-file-pdf" style="color:red"></i> PDF</span>',
                className: 'btn btn-info',
                title: 'Donation_Data_export_PDF',
                orientation: 'landscape',
                'exportOptions': {
                    //columns: 'th:not(:last-child)'
                    columns: [2, 3, 4, 5, 6, 7, 8, 9]
                }
            }
        ],
        "pageLength": 25,
        "aaSorting":[[0, "desc"]],

        "dom": 'B<"toolbar">flrtip',
        "lengthMenu": [[7, 10, 25, 50, -1], [7, 10, 25, 50, "All"]],
        initComplete: function () {
            $("div.toolbar").addClass("row");
            $("div.toolbar").css("padding-left", "0px");
            //this.api().columns([2]).every(function () {
            //    var column = this;
            //    var spanheader = $("<div class='col-lg-5 col-md-6 col-sm-12 d-flex justify-content-start' id='orgselect'><span style='padding-right:5px;'>Filter Orginazation Type </span></div>").appendTo($("div.toolbar"));
            //    var select = $("<select class='tooltipper custom-select custom-select-sm form-control form-control-sm ' title='Filter Through Different Orginazation Types' id='catFilter'><option value=''>Select Donor</option></select>")
            //        .appendTo($("#orgselect"))
            //        .on('change', function () {
            //            var val = $.fn.dataTable.util.escapeRegex(
            //                $(this).val()
            //            );

            //            column.search(val ? '^' + val + '$' : '', true, false).draw();
            //        });
            //        });


            //    column.data().unique().sort().each(function (d, j) {

            //        select.append('<option value="' + d + '">' + d + '</option>')
            //    });

            //    $('.tooltipper').tooltipster({
            //        theme: ['tooltipster-noir', 'tooltipster-noir-customized'],
            //        contentAsHTML: 'true',
            //        side: 'bottom'
            //    });
            //});
            this.api().columns([6]).every(function () {
                var column = this;
                var spanheader = $("<div class='col-lg-5 col-md-6 col-sm-12 d-flex justify-content-start' id='donorselect'><span style='padding-right:5px;'>Filter Donor Type </span></div>").appendTo($("div.toolbar"));
                var select = $("<select class='tooltipper custom-select custom-select-sm form-control form-control-sm ' title='Filter Through Different Donor Type' id='catFilter'><option value=''>Select Donor</option></select>")
                    .appendTo($("#donorselect"))
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
            this.api().columns([7]).every(function () {
                var column = this;
                var spanheader = $("<div class='col-lg-5 col-md-6 col-sm-12 d-flex justify-content-start' id='donationselect'><span style='padding-right:5px;'>Filter Donation Type </span></div>").appendTo($("div.toolbar"));
                var select = $("<select class='tooltipper custom-select custom-select-sm form-control form-control-sm ' title='Filter Through Different Donation Type' id='catFilter'><option value=''>Select Donation</option></select>")
                    .appendTo($("#donationselect"))
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
    $('#donation-datatable tbody').on('click', '#myBtnEdit', function () {
        let data = $('#donation-datatable').DataTable().row($(this).parents('tr')).data();
        modal.open();
        $("#txtDonationID").val(data.DonationID);
        $("#txtDonorID").val(data.DonorID);
        $("#txtFn").val(data.DonorFN);
        $("#txtLn").val(data.DonorLN);
        $("#txtEmail").val(data.DonorEmail);
        $('#selDonationType').val(data.DonationType);
        $('#selDonationType').trigger('change');
        $('#selDonorType').val(data.DonorType);
        $('#selDonorType').trigger('change');
        $("#txtOrg").val(data.DonorOrgs);
        $("#txtDonationDate").val(data.DonationDate);
    });
    $("#btnModalSave").on("click", function (event) {

        if (validateemptyDonationEdit() === false) {
            return;
        }
        else {
            var donation = {
                DonationId: $("#txtDonationID").val(),
                DonationType: $('#selDonationType').val(),
                DonationDate: $("#txtDonationDate").val()
            };
            var donor = {
                DonorID: $("#txtDonorID").val(),
                DonorFN: $("#txtFn").val(),
                DonorLN: $("#txtLn").val(),
                DonorEmail: $("#txtEmail").val(),
                DonorType: $('#selDonorType').val(),
                DonorOrgs: $("#txtOrg").val()
            };

            $.ajax({
                type: "POST",
                url: "DonationHistory.aspx/UpdateDonation",
                data: JSON.stringify(donation),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (result) {
                    // //response will return the value you assigned while returning on success call of ajax.
                    //$('#donation-datatable').DataTable().ajax.reload();
                },
                error: function (result) {
                    // reponse will return server side error message.
                    console.log(e);
                }
            });

            $.ajax({
                type: "POST",
                url: "DonationHistory.aspx/UpdateDonor",
                data: JSON.stringify(donor),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async:false,
                success: function (result) {
                    // //response will return the value you assigned while returning on success call of ajax.

                },
                error: function (result) {
                    console.log(e);
                }
            });

            $('#donation-datatable').DataTable().ajax.reload();
            modal.close();
            Swal.fire(
                'Saved',
                'Your changes have been made!',
                'success'
            );
        }





        //if ($('#selDonorType').val() === "Anonymous") {

        //    var donation = {
        //        DonationId: $("#txtDonationID").val(),
        //        DonationType: $('#selDonationType').val(),
        //        DonationDate: $("#txtDonationDate").val()
        //    };
        //    var donor = {
        //        DonorID: $("#txtDonorID").val(),
        //        DonorFN: "",
        //        DonorLN: "",
        //        DonorEmail: "",
        //        DonorType: $('#selDonorType').val(),
        //        DonorOrgs: ""
        //    };
        //    $.ajax({
        //        type: "POST",
        //        url: "DonationHistory.aspx/UpdateDonation",
        //        data: JSON.stringify(donation),
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (result) {
        //            // //response will return the value you assigned while returning on success call of ajax.
        //            $('#donation-datatable').DataTable().ajax.reload();
        //        },
        //        error: function (result) {
        //            // reponse will return server side error message.
        //            console.log(e);
        //        }
        //    });
        //    $.ajax({
        //        type: "POST",
        //        url: "DonationHistory.aspx/UpdateDonor",
        //        data: JSON.stringify(donor),
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (result) {
        //            // //response will return the value you assigned while returning on success call of ajax.
        //            $('#donation-datatable').DataTable().ajax.reload();
        //            modal.close();
        //            Swal.fire(
        //                'Saved',
        //                'Your changes have been made!',
        //                'success'
        //            );
        //        },
        //        error: function (result) {
        //            console.log(e);
        //        }
        //    });
        //}
        //else if ($('#selDonorType').val() === "Organization") {
        //    var donation = {
        //        DonationId: $("#txtDonationID").val(),
        //        DonationType: $('#selDonationType').val(),
        //        DonationDate: $("#txtDonationDate").val()
        //    };
        //    var donor = {
        //        DonorID: $("#txtDonorID").val(),
        //        DonorFN: "",
        //        DonorLN: "",
        //        DonorEmail: $("#txtEmail").val(),
        //        DonorType: $('#selDonorType').val(),
        //        DonorOrgs: $("#txtOrg").val()
        //    };
        //    $.ajax({
        //        type: "POST",
        //        url: "DonationHistory.aspx/UpdateDonation",
        //        data: JSON.stringify(donation),
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (result) {
        //            // //response will return the value you assigned while returning on success call of ajax.
        //            $('#donation-datatable').DataTable().ajax.reload();
        //        },
        //        error: function (result) {
        //            // reponse will return server side error message.
        //            console.log(e);
        //        }
        //    });
        //    $.ajax({
        //        type: "POST",
        //        url: "DonationHistory.aspx/UpdateDonor",
        //        data: JSON.stringify(donor),
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        success: function (result) {
        //            // //response will return the value you assigned while returning on success call of ajax.
        //            $('#donation-datatable').DataTable().ajax.reload();
        //            modal.close();
        //            Swal.fire(
        //                'Saved',
        //                'Your changes have been made!',
        //                'success'
        //            );
        //        },
        //        error: function (result) {
        //            console.log(e);
        //        }
        //    });
        //}
        //else {
        //    if (validateemptyDonationEdit()) {
        //        var donation = {
        //            DonationId: $("#txtDonationID").val(),
        //            DonationType: $('#selDonationType').val(),
        //            DonationDate: $("#txtDonationDate").val()
        //        };

        //        var donor = {
        //            DonorID: $("#txtDonorID").val(),
        //            DonorFN: $("#txtFn").val(),
        //            DonorLN: $("#txtLn").val(),
        //            DonorEmail: $("#txtEmail").val(),
        //            DonorType: $('#selDonorType').val(),
        //            DonorOrgs: $("#txtOrg").val()
        //        };
        //        $.ajax({
        //            type: "POST",
        //            url: "DonationHistory.aspx/UpdateDonation",
        //            data: JSON.stringify(donation),
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: function (result) {
        //                // //response will return the value you assigned while returning on success call of ajax.
        //                $('#donation-datatable').DataTable().ajax.reload();
        //            },
        //            error: function (result) {
        //                // reponse will return server side error message.
        //                console.log(e);
        //            }
        //        });
        //        $.ajax({
        //            type: "POST",
        //            url: "DonationHistory.aspx/UpdateDonor",
        //            data: JSON.stringify(donor),
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: function (result) {
        //                // //response will return the value you assigned while returning on success call of ajax.
        //                $('#donation-datatable').DataTable().ajax.reload();
        //                modal.close();
        //                Swal.fire(
        //                    'Saved',
        //                    'Your changes have been made!',
        //                    'success'
        //                );
        //            },
        //            error: function (result) {
        //                console.log(e);
        //            }
        //        });
        //    }



        //}


    });

    $('#donation-datatable tbody').on('click', '#myBtnDelete', function () {
        let data = $('#donation-datatable').DataTable().row($(this).parents('tr')).data();
        Swal.fire({
            title: 'Are you sure?',
            text: "This will delete this Donation! You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonClass: 'btn btn-default',
            confirmButtonText: 'Delete',
            reverseButtons: true,
            preConfirm: () => {
                return [
                    data.DonationID,
                    data.DonorID,
                ];
            }
        }).then((result) => {
            if (result.value) {
                var donationID = { DonationID: data.DonationID };
                var donorID = { DonorID: data.DonorID }
                $.ajax({
                    type: "POST",
                    url: "DonationHistory.aspx/DeleteDonation",
                    data: JSON.stringify(donationID),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        //response will return the value you assigned while returning on success call of ajax.
                        $('#donation-datatable').DataTable().ajax.reload();

                    },
                    error: function (result) {
                        // reponse will return server side error message.
                        console.log(e);
                    }
                });

                $.ajax({
                    type: "POST",
                    url: "DonationHistory.aspx/DeleteDonor",
                    data: JSON.stringify(donorID),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        //response will return the value you assigned while returning on success call of ajax.
                        //('#donation-datatable').ajax.reload()
                        $('#donation-datatable').DataTable().ajax.reload();

                    },
                    error: function (result) {
                        // reponse will return server side error message.
                        console.log(e);
                    }
                });
            }
        });
    });
    $('#donation-datatable tbody').on('click', '#btnDetails', function () {
        var data = $('#donation-datatable').DataTable().row($(this).parents('tr')).data();
        var donationID = { DonationID: data.DonationID };
        var editDetail;
        $.ajax({
            type: "POST",
            url: "DonationHistory.aspx/GetDonationDetail",
            data: JSON.stringify(donationID),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var x = (result.d).replace("\\", "");
                var item = JSON.parse(x);
                console.log(item[0]);
                editDetail = item[0].DonationDetail;
                console.log(editDetail);
                Swal.fire({
                    title: 'Donation Details',
                    showCancelButton: true,
                    confirmButtonColor: 'green',
                    cancelButtonColor: '#d33',
                    focusConfirm: false,
                    confirmButtonText: ' Confirm Edit',
                    width: '800px',
                    html:
                        "<div class='input-group w-100 p-3'><textarea id='DonationDetails' type='text' class='form-control'aria-label='Details' rows='10' cols='100' maxlength='250' placeholder='' >" + item[0].DonationDetail + "</textarea></div>" +
                        "<div class='input-group w-100 p-3'><Span style='color: red'>Reminder: 'Confirm edit' will save the form and overwritten data will be lost.</span></div>",
                    onOpen: () => {
                        $("#DonationDetails").characterCounter({
                            max: 250,
                            textArea: true,
                        })
                    },
                    preConfirm: () => {
                        return [
                            data.DonationID,
                            document.getElementById('DonationDetails').value,
                        ];
                    }
                }).then((result) => {

                    var donation = {
                        DonationID: result.value[0],
                        DonationDetails: result.value[1]
                    };
                    Swal.fire(
                        'Saved',
                        'Your changes have been made!',
                        'success'
                    );
                    $.ajax({
                        type: "POST",
                        url: "DonationHistory.aspx/UpdateDonationDetails",
                        data: JSON.stringify(donation),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            // //response will return the value you assigned while returning on success call of ajax.
                            $('#donation-datatable').DataTable().ajax.reload();

                        },
                        error: function (result) {
                            // reponse will return server side error message.
                            console.log(e);
                        }
                    });
                });

            },
            error: function (result) {
                // reponse will return server side error message.
                console.log(e);
            }
        });
    });
});








