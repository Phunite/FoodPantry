window.onload = function () {
    var panel = document.getElementById("panel");
    var totalQuantity = document.getElementById("totalQuant");
}

var top = document.getElementById("topPortion");



function togglepanel() {
    panel.style.display = "block";

}

function removepanel() {
    panel.style.display = "none";
}

function removepanel2() {
    panel2.style.display = "none";
    document.getElementById("totalQuant").innerHTML = "0";
}

function thumbnailclick() {
    document.getElementById("alertpopup").style.display = "block";
    document.getElementById("alertpopup").style.width = "60%";
    document.getElementById("alertpopup").style.cursor = "url";
    document.getElementById("barcodeimg").src = '/images/scan item.jpg';
    
}

function viewportclick() {
    var src = '/images/scan item.jpg';
    var container = document.getElementById('thumbnail_Place');
    var img = document.createElement('img');
    img.src = src;
    img.className = 'thumb';
    img.style.width = '30px';
    container.appendChild(img);
    container.removeChild(document.getElementById('cameraicon'));
    
}

function thumbnailclick2() {
    document.getElementById("alertpopup2").style.display = "block";
    document.getElementById("alertpopup2").style.width = "40%";
    document.getElementById("alertpopup2").style.cursor = "url";
    document.getElementById("barcodeimg").src = '/images/barkthin barcode.jpg';

    var src = '/images/barkthin.jpg';
    var container = document.getElementById('thumbnail_Place2');
    var img = document.createElement('img');
    img.src = src;
    img.className = 'thumb';
    img.style.width = '30px';
    container.appendChild(img);
    container.removeChild(document.getElementById('cameraicon2'));

    document.getElementsByClassName('itemUPC2');
}