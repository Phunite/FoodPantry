
$(document).ready(function () {

    $('#qty_input').val(getMaxPoint());

    $('#plus-btn').click(function () {
        $('#qty_input').val(parseInt($('#qty_input').val()) + 1);
    });

    $('#minus-btn').click(function () {
        $('#qty_input').val(parseInt($('#qty_input').val()) - 1);
        if ($('#qty_input').val() === 0) {
            $('#qty_input').val(1);
        }
    });

    $("#btnUpdate").click(function (e) {
        Swal.fire({
            title: "Point Limit Updated ",
            text: "The total amount of points allowed at checkout has been updated.",
            type: "success",
            showCancelButton: false,
            allowOutsideClick: false
        });

        setMaxPoint($('#qty_input').val());
    });

    $("#qty_input").keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });
});

function setMaxPoint(limit) {
    var sendData = '{"point": "' + limit + '"}';

    jQuery.ajax({
        type: "POST",
        url: "Points.aspx/setMaxPoint",
        contentType: "application/json; charset=utf-8",
        data: sendData,
        dataType: "json",
        success: function (result) {
            console.log(result);
        },
        error: function (e) {
            console.log(e);
            return false;
        }
    });
}
function getMaxPoint() {
    var point;

    jQuery.ajax({
        type: "POST",
        url: "Points.aspx/getMaxPoint",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            point = result.d;
        },
        error: function (e) {
            console.log(e);
            return false;
        }
    });

    return point;
}