$(document).ready(function () {

    //$("#menu-toggle").click(function () {
    //    $("#sidebar-wrapper").setAttribute("style", "width:70px;");
    //})

    $(document)
        .ajaxStart(function () {
            $("#loader").show();
            //$(".box-body").hide();
            //$(".lds-ellipsis").css("position", "inline-block");
        })
        .ajaxStop(function () {
            $("#loader").hide();
            //$(".box-body").show();

            //$(".lds-ellipsis").css("position", "none");
        });

    $('#btnLogout').click(function (e) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'In order to logout please close the browser'
        });
        sessionStorage.clear();
        window.location.href = "../Logout.aspx";
    });


    //$.keypress().each(function (e) {
    //    $("#ContentPlaceHolder1_btnSearch").click();
    //});

    if ($('#hfRole').val() != "Admin") {
        $('#btnAdminDropDown').hide();
        $('#adminddl').hide();
        $(".dt-button").css("display", "none");
    }
    else {
        $('#btnAdminDropDown').show();
        $('#adminddl').show();
        $("#donationddl").css("display", "none");
        $("#donationdown").css("display", "none");
        $("#donationleft").css("display", "inline-grid");
        $("#adminddl").css("display", "none");
        $("#admindown").css("display", "none");
        $("#adminleft").css("display", "inline-grid");
        $(".dt-button").css("display", "inline-block");

    }


    $("#menu-toggle").click(function (e) {
        var pos = $("#pos-checkin");
        //if (e.target.className === "material-icons hamburger") {
        let sidebarwrapper = document.getElementById("sidebar-wrapper");
        if (sidebarwrapper.classList.contains("sidebar-hide")) {
            sidebarwrapper.classList.remove("sidebar-hide");
            $("#donationddl").css("display", "none");
            $("#donationdown").css("display", "none");
            $("#donationleft").css("display", "inline-grid");
            $("#adminddl").css("display", "none");
            $("#admindown").css("display", "none");
            $("#adminleft").css("display", "inline-grid");



        }
        else {
            sidebarwrapper.classList.add("sidebar-hide");
            $("#donationddl").css("display", "none");
            $("#donationdown").css("display", "none");
            $("#donationleft").css("display", "inline-grid");
            $("#adminddl").css("display", "none");
            $("#admindown").css("display", "none");
            $("#adminleft").css("display", "inline-grid");


        }

        e.preventDefault();
        //}
    });

    $("#sidebar-wrapper").on('mouseenter', function (e) {
        let sidebarwrapper = document.getElementById("sidebar-wrapper");
        $(window).trigger('resize');
        if (sidebarwrapper.classList.contains("sidebar-hide")) {
            sidebarwrapper.classList.add("sidebar-visit");
            sidebarwrapper.classList.remove("sidebar-hide");

            e.preventDefault();
        }
        $(window).trigger('resize');

    });

    $("#sidebar-wrapper").on('mouseleave', function (e) {
        let sidebarwrapper = document.getElementById("sidebar-wrapper");

        if (sidebarwrapper.classList.contains("sidebar-visit")) {
            sidebarwrapper.classList.remove("sidebar-visit");
            sidebarwrapper.classList.add("sidebar-hide");

            //$(".category").width($("#mainContent").width() - $(".pos").width());


        }
        $(window).trigger('resize');


    });

    $(".list-group a").each(function () {
        if ($(this).prop('href') === window.location.href) {
            $(this).addClass('link-active'); $(this).parents('li').addClass('link-active');
            if ($(this).hasClass("dropdown-item")) {
                var parent = $(this).parent()[0];
                var btnID = parent.attributes["aria-label"].value;
                var buttonControl = $("#" + btnID + "");

                $(parent).css("display", "contents");
                $(buttonControl).addClass('link-active');

                var p = $(buttonControl).children()[1];
                var arrowDown = $(p).children()[0];
                var arrowLeft = $(p).children()[1];

                $(arrowDown).css("display", "inline-grid");
                $(arrowLeft).css("display", "none");
            }

        }
        if ($(".dropdown-container").css("display") === "contents") {
            $(".dropdownb-btn").addClass('link-active');
        }

    });

    $(".dropdown-btn").click(function (e) {
        let container = $(this).next()[0];
        let arrowDown = $($($(container).prev()).children()[1]).children()[0];
        let arrowLeft = $($($(container).prev()).children()[1]).children()[1];

        if ($(container).css("display") === "contents") {
            $(container).css("display", "none");
            $(arrowDown).css("display", "none");
            $(arrowLeft).css("display", "inline-grid");
        }
        else {
            $(container).css("display", "contents");
            $(container).addClass('link-active');
            $(container).parents('li').addClass('link-active');

            $(arrowDown).css("display", "inline-grid");
            $(arrowLeft).css("display", "none");
        }

    });


    $("input:not(.scan-box)").keydown(function (event) {
        if (event.which === '13') {
            event.preventDefault();
        }
    });

});
