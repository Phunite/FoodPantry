function validateweight() {
    var weight = $("#weight");

    if (weight.val() === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a weight.',
            footer: 'You left weight as an empty value.'
        }).then((result) => {
            weight.val("");
            weight.focus();
        });
    }
    else if (isNaN(weight.val())) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid weight.',
            footer: 'Weight is a positive number. Ex: 3, 3.3, 3.33'
        }).then((result) => {
            weight.val("");
            weight.focus();
        });
    }
    else if (weight.val() <= 0) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid weight.',
            footer: 'Weight is a positive number. Ex: 3, 3.3, 3.33'
        }).then((result) => {
            weight.val("");
            weight.focus();
        });
    }
    
}

function validatequantity() {
    var quantity = $("#txtQuantity");

    if (quantity.val() === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a quantity.',
            footer: 'You left quantity as an empty value.'
        }).then((result) => {
            quantity.val("");
            quantity.focus();
        });
    }
    else if (isNaN(quantity.val()) ) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid quantity.',
            footer: 'Quantity has to be a positive integer. '
        }).then((result) => {
            quantity.val("");
            quantity.focus();
        });
    }
    else if (!(quantity.val() % 1 === 0)) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid quantity.',
            footer: 'Quantity has to be a positive integer. '
        }).then((result) => {
            quantity.val("");
            quantity.focus();
        });
    }
    else if (quantity.val() <= 0) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid quantity.',
            footer: 'Quantity has to be a positive integer. '
        }).then((result) => {
            quantity.val("");
            quantity.focus();
        });
    }

}

function validatevalue() {
    var point = $("#txtPoint");

    if (point.val() === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a point value.',
            footer: 'You left point value as an empty value.'
        }).then((result) => {
            point.val("");
            point.focus();
        });
    }
    else if (isNaN(point.val())) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid point value.',
            footer: 'Point has to be a positive integer. '
        }).then((result) => {
            point.val("");
            point.focus();
        });
    }
    else if (!(point.val() % 1 === 0)) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid point value.',
            footer: 'Point has to be a positive integer. '
        }).then((result) => {
            point.val("");
            point.focus();
        });
    }
    else if (point.val() <= 0) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid point value.',
            footer: 'Point has to be a positive integer.'
        }).then((result) => {
            point.val("");
            point.focus();
        });
    }


}

function validateempty() {

    var category = $("#selCategory").val();
    var packaging = $("#selPackaging").val();
    var weight = $("#weight");
    var quantity = $("#txtQuantity");
    var point = $("#txtPoint");

    if (category === "" || category === null || category === "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please select a category.',
            footer: 'You left category dropdown empty.'
        }).then((result) => {
            $("#selCategory").select2('open');
        });
        return false;
    }
    else if (packaging === "" || packaging === null || packaging === "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please select a packaging.',
            footer: 'You left packaging dropdown empty.'
        }).then((result) => {
            $("#selPackaging").select2('open');
        });
        return false;
    }
    //else if (weight.val() === "") {
    //    Swal.fire({
    //        type: 'warning',
    //        title: 'Oops...',
    //        text: 'Please enter a weight.',
    //        footer: 'You left weight as an empty value.'
    //    }).then((result) => {

    //    });
    //    return false;
    //}
    else if (quantity.val() === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a quantity.',
            footer: 'You left quantity as an empty value.'
        }).then((result) => {

        });
        return false;
    }
    else if (point.val() === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a point value.',
            footer: 'You left point value as an empty value.'
        }).then((result) => {

        });
        return false;
    }
    else {
      
        return true;
    }
}

function validateemptyinventory() {

    var category = $('#selCategory').val();
    var packaging = $('#selPackaging').val();
    var weight = $("#weight").val();
    var weightunit = $("#weightunit");
    var quantity = $("#txtQuantity").val();
    var point = $("#txtPoint").val();

    if (category === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please select a category.',
            footer: 'You left category dropdown empty.'
        }).then((result) => {
            $("#selCategory").select2('open');
        });
        return false;
    }
    else if (packaging === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please select a packaging.',
            footer: 'You left packaging dropdown empty.'
        }).then((result) => {
            $("#selPackaging").select2('open');
        });
        return false;
    }
    else if (quantity === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a quantity.',
            footer: 'You left quantity as an empty value.'
        }).then((result) => {
            $("#txtQuantity").focus();
        });
        return false;
    }
    else if (isNaN(quantity)) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid quantity.',
            footer: 'Quantity has to be a positive integer. '
        }).then((result) => {
            $("#txtQuantity").val("");
            $("#txtQuantity").focus();
        });
        return false;
    }
    else if (!(quantity % 1 === 0)) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid quantity.',
            footer: 'Quantity has to be a positive integer. '
        }).then((result) => {
            $("#txtQuantity").val("");
            $("#txtQuantity").focus();
            });
        return false;
    }
    else if (weight !== "") {
        if (isNaN(weight)) {
            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Please enter a valid weight.',
                footer: 'Weight is a positive number. Ex: 3, 3.3, 3.33'
            }).then((result) => {
                $("#weight").val("");
                $("#weight").focus();
            });
            return false;
        }
        else if (weight <= 0) {
            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Please enter a valid weight.',
                footer: 'Weight is a positive number. Ex: 3, 3.3, 3.33'
            }).then((result) => {
                $("#weight").val("");
                $("#weight").focus();
            });
            return false;
        }
        else if (weightunit.val() === null) {
            Swal.fire({
                type: 'warning',
                title: 'Oops...',
                text: 'Please select a weight unit.',
                footer: 'Weight unit can be oz, g, Kg, lbs, or fl oz.'
            }).then((result) => {
                weightunit.focus();
            });
            return false;
        }
        return true;
    }
    else if (point === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a point value.',
            footer: 'You left point value as an empty value.'
        }).then((result) => {

        });
        return false;
    }
    else if (isNaN(point)) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid point value.',
            footer: 'Point has to be a positive integer. '
        }).then((result) => {
            $("#txtPoint").val("");
            $("#txtPoint").focus();
            });
        return false;
    }
    else if (!(point % 1 === 0)) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid point value.',
            footer: 'Point has to be a positive integer. '
        }).then((result) => {
            $("#txtPoint").val("");
            $("#txtPoint").focus();

            });
        return false;
    }
    else if (point < 0) {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a valid point value.',
            footer: 'Point has to be a positive integer.'
        }).then((result) => {
            $("#txtPoint").val("");
            $("#txtPoint").focus();
            });
        return false;
    }
    else {

        return true;
    }
} 

function validateDonation() {
    var firstName = $("#fname").val();
    var lastName = $("#lname").val();
    var donorType = $("#donorType").val();
    var donationType = $("#donationType").val();
    var email = $("#emailAddress").val();
    var organization = $("#organization").val();
    var templeAffiliation = $("#templeAffiliation").val();
    var tuID = $("#tuid").val();
    var donationDetail = $("#donationDetail").val();
    var savedDonor = $("#txtSaveDonor").val();

    if (donationType === "" || donationType === null || donationType === "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please select a Donation Type.'
            //footer: 'You left Donation Type dropdown empty.'
        }).then((result) => {
            $("#selDonationType").select2('open');
        });
        return false;
    }
    else if (donorType === "" || donorType === null || donorType === "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please select a donor type.'
            //footer: 'You left Donor Type dropdown empty.'
        }).then((result) => {
            $("#selDonorType").select2('open');
        });
        return false;
    }
    else if (templeAffiliation === "" || templeAffiliation === null || templeAffiliation === "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please select a temple affiliation.'
            //footer: 'You left Donor Type dropdown empty.'
        }).then((result) => {
            $("#selDonorType").select2('open');
        });
        return false;
    }

    if (donorType === "Individual" && firstName === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a First Name.',
            footer: 'Individual donor type requires a first name.'
        });
        return false;
    }
    else if (donorType === "Individual" && lastName === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a Last Name.',
            footer: 'Individual donor type requires a last name.'
        });
        return false;
    }
    else if (donorType === "Individual" && email === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter an email address.',
            footer: 'Individual donor type requires an email address.'
        });
        return false;
    }

    if (donorType === "Organization" && orgs === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter an Organization Name.',
            footer: 'Organization donor type requires an organization name.'
        });
        return false;
    }
    return true;
}

function validateemptyCheckout() {
    var data = {
        "#txtUPC": $("#txtUPC").val(),
        "#selCategory": $("#selCategory").select2('data')[0].text,
        "#selPackaging": $("#selPackaging").select2('data')[0].text,
        "#txtPoint": $("#txtPoint").val()
    };

    const values = Object.entries(data);

    for (const value of values) {
        if (value[1] === "" || value[1] === null) {
            console.log(value[0]);
            if (value[0].includes("sel")) {
                $("" + value[0] + "").select2().parent().addClass("form-error")
            }
            $("" + value[0] + "").addClass("form-error");
            return false;
        }
        else {
            if (value[0].includes("sel")) {
                $("" + value[0] + "").select2().parent().removeClass("form-error")
            }
            $("" + value[0] + "").removeClass("form-error");
        }
    }

    if (isNaN(data["#txtPoint"]) || data["#txtPoint"] < 0 ) {
        $("#txtPoint").addClass("form-error");
        return false;
    }
    else {
        $("#txtPoint").removeClass("form-error");

    }
    return true;
}

function validateUser() {
    var data = {
        "#txtFirstName": $("#txtFirstName").val(),
        "#txtLastName": $("#txtLastName").val(),
        "#txtAccessNet": $("#txtAccessNet").val(),
        "#selRoles": $("#selRoles").val(),
        "#selStatus": $("#selStatus").val()
    };


    const values = Object.entries(data);

    for (const value of values) {
        if (value[1] === "" || value[1] === null) {
            console.log(value[0]);
            $("" + value[0] + "").addClass("form-error");
            return false;
        }
        else {
            $("" + value[0] + "").removeClass("form-error");
        }
    }
}

function validateCategory(){
    var data = {
        "#txtCategoryName": $("#txtCategoryName").val(),
        "#selPackageType": $("#selPackageType").select2('data')[0].text,
    };

    const values = Object.entries(data);

    for (const value of values) {
        if (value[1] === "" || value[1] === null) {
            console.log(value[0]);
            if (value[0].includes("sel")) {
                $("" + value[0] + "").select2().parent().addClass("form-error")
            }
            $("" + value[0] + "").addClass("form-error");
            return false;
        }
        else {
            if (value[0].includes("sel")) {
                $("" + value[0] + "").select2().parent().removeClass("form-error")
            }
            $("" + value[0] + "").removeClass("form-error");
        }
    }
}

function validateemptyDonationEdit() {
   var fn= $("#txtFn").val();
   var ln= $("#txtLn").val();
   var email=$("#txtEmail").val();
   var donationType=$('#selDonationType').val();
   var donorType= $('#selDonorType').val();
   var orgs= $("#txtOrg").val();
   var donationDate = $("#txtDonationDate").val();

    if (donationType === "" || donationType === null || donationType === "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please select a Donation Type.'
            //footer: 'You left Donation Type dropdown empty.'
        }).then((result) => {
            $("#selDonationType").select2('open');
        });
        return false;
    }
    else if (donorType === "" || donorType === null || donorType === "-1") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please select a donor type.'
            //footer: 'You left Donor Type dropdown empty.'
        }).then((result) => {
            $("#selDonorType").select2('open');
        });
        return false;
    }

    if (donorType === "Individual" && fn === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a First Name.',
            footer: 'Individual donor type requires a first name.'
        });
        return false;
    }
    else if (donorType === "Individual" && ln === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter a Last Name.',
            footer: 'Individual donor type requires a last name.'
        });
        return false;
    }
    else if (donorType === "Individual" && email === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter an email address.',
            footer: 'Individual donor type requires an email address.'
        });
        return false;
    }

    if (donorType === "Organization" && orgs === "") {
        Swal.fire({
            type: 'warning',
            title: 'Oops...',
            text: 'Please enter an Organization Name.',
            footer: 'Organization donor type requires an organization name.'
        });
        return false;
    }
    return true;
   
} 


