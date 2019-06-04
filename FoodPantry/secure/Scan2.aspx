<%@ Page Title="" Language="C#" MasterPageFile="~/secure/CherryPantry.Master" AutoEventWireup="true" CodeBehind="Scan2.aspx.cs" Inherits="FoodPantry.Scan2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <meta name="viewport" content="width=device-width; initial-scale=1.0; user-scalable=no" />

    <%--js plugins--%>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script src="DataTables/datatables.min.js"></script>
    <script src="DataTables/Responsive-2.2.2/js/responsive.bootstrap.min.js"></script>
    <script src="DataTables/Responsive-2.2.2/js/dataTables.responsive.min.js"></script>
    <script src="js/scan.js"></script>
    <script src="js/Validate.js"></script>
    <script type="text/javascript" src="plugin/dist/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="plugin/dist/rmodal.min.js"></script>
    <script type="text/javascript" src="tooltipster/dist/js/tooltipster.bundle.min.js"></script>
    <script type="text/javascript" src="plugin/dist/select2.full.min.js"></script>

    <%--css stylesheets--%>
    <link rel="stylesheet" href="css/scan.css" />
    <link href="css/POS.css" rel="stylesheet" />
    <link href="css/POS-Media2.css" rel="stylesheet" />
    <link href="tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-noir.min.css" rel="stylesheet" />
    <link href="DataTables/datatables.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/sweetalert2.min.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/animate.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/rmodal.css" />
    <link rel="stylesheet" type="text/css" href="tooltipster/dist/css/tooltipster.bundle.min.css" />
    <script type="text/javascript" src="tooltipster/dist/js/tooltipster.bundle.min.js"></script>
    <link rel="stylesheet" type="text/css" href="plugin/dist/select2.min.css" />

    <%--Tooltip --%>
     <link rel="stylesheet" type="text/css" href="tooltipster/dist/css/tooltipster.bundle.min.css" />
    <link href="tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-noir.min.css" rel="stylesheet" />

</asp:Content>


<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--<asp:Label ID="test" runat="server"></asp:Label>--%>
    <div id="modal" class="modal">
        <div class="modal-dialog animated">
            <div class="modal-content">
                <form class="form-horizontal" method="get">
                    <div class="modal-header">
                        <strong>Add New Item</strong>
                    </div>
                    <div class="modal-body">
                        <div class="modal-error"></div>
                        <div class="form-group" id="fgUPC">
                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>UPC/Name<span class="required">*</span></span>
                                </div>
                                <input id='txtUPC' type='text' class='form-control' readonly aria-label='UPC' value='' />
                            </div>
                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>Category<span class="required">*</span></span>
                                </div>
                                <select class='form-control select2 select2-category' id='selCategory' style="width: 70%"></select>
                            </div>
                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>Packaging<span class="required">*</span></span>
                                </div>
                                <select class='form-control select2 select2-packaging' id='selPackaging' style="width: 70%"></select>
                            </div>

                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>Weight</span>
                                </div>
                                <input id='weight' type='text' class='form-control' aria-label='Weight' value='' />
                                <div class='input-group-append'>
                                    <select class='form-control' id='weightunit'>
                                        <option value="oz">oz</option>
                                        <option value="g">g</option>
                                        <option value="kg">Kg</option>
                                        <option value="lbs">lbs</option>
                                        <option value="floz">fl oz</option>
                                    </select>
                                </div>
                            </div>
                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>Point Value<span class="required">*</span></span>
                                </div>
                                <input type="text" id="txtPoint" class="form-control" />
                            </div>

                        </div>
                    </div>

                    <div class="modal-footer">
                        <button id="btnModalCancel" class="btn btn-cancel" type="button" onclick="modal.close();">Cancel</button>
                        <button id="btnModalSave" class="btn btn-save" type="button">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="content" id="mainContent">
        <div class="pos">
            <div class="box box-primary" style="height: 100%">
                <div class="box-header">
                    <h3>Scan UPC Code</h3>
                </div>
                <div class="box-body pt-4" id="pos-box">
                    <input type="text" id="txtSearchUPC" title="Please Continue Using Scanner Device" class="scan-box form-control form-control-danger tooltipper" placeholder="Search Product by Code or Category" />
                    <div class="buttonWrapper">
                        <asp:Button runat="server" ID="btnSearch" Text="Search" OnClientClick="return false;" CssClass="btn btn-info" Style="display: none" />
                    </div>
                    <div id="alert-wrapper">
                    </div>
                    <div id="cart">
                        <table id="cart-table" class="table" style="width: 100%">

                            <thead>
                                <tr>
                                    <th>UPC</th>
                                    <th>Category</th>
                                    <th>Packaging</th>
                                    <th>Quantity</th>
                                    <%--<th>Weight</th>--%>
                                    <th>Points</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>

                        </table>
                    </div>
                    <div id="pos-footer">
                        <div id="cart-info">
                            <table id="info-table">
                                <tr>
                                    <td>
                                        <span class="label">Items:</span><span class="value" id="totalItems">0</span>
                                    </td>
                                    <td>
                                        <span class="label">Total Points:</span><span class="value" id="totalPoints">0</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <br />
                        <div class="buttonWrapper" id="checkout-buttons">
                            <button id="btnClear" class="btn btn-cancel" value="Checkout" onclick="return false;"><i class="material-icons">delete_sweep</i> Clear</button>
                            <button id="btnCheckout" class="btn btn-save" value="Checkin" onclick="return false;"><i class="material-icons">check_circle</i> Check-Out</button>
                            <%--<button id="btnCancel" class="btn btn-danger" value="Checkout" onclick="return false;"><i class="material-icons">cancel</i> Cancel</button>--%>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="category">
            <div class="box box-primary" style="height: 100%" id="cat-box">
                <div class="box-header">
                </div>
                <div id="category_box-body" class="box-body" style="padding-top: 0px">
                    <div id="category-text"></div>
                    <div id="catagory-wrapper">
                    </div>
                </div>

            </div>
        </div>
    </div>

    <%--<div class="content" id="mainContent">
        <div class="row" id="controlRow">
            <div class="col-xs-12">
                <div class="box box-primary">
                    <div class="box-header">
                        <h3>Scan UPC Code</h3>
                    </div>
                    <div class="box-body">
                        <input type="text" id="txtSearchUPC" title="Please Continue Using Scanner Device" class="form-control form-control-danger tooltipper" placeholder="UPC Code" />
                        <div class="buttonWrapper">
                            <asp:Button runat="server" ID="btnSearch" Text="Search" OnClientClick="return false;" CssClass="btn btn-info scanButton" />
                        </div>
                    </div>

                </div>

                <div class="box box-success">
                    <div class="box-header">
                        <h3>Cart</h3>
                    </div>
                    <div class="box-body">
                        <table id="table" class="table table-bordered">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>UPC</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Weight</th>
                                    <th>Points</th>
                                    <th style="width: 20%;">Total Points</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th style="text-align: right">Total:</th>
                                    <th id="totalCell"></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div class="box box-success">
                    <div class="box-body">
                        <div class="buttonWrapper">
                            <input id="btnCheckout" class="btn btn-success scanButton" type="button" value="Checkout" onclick="checkout()" />
                            <input id="btnClearCart" class="btn btn-warning scanButton" type="button" value="Clear Cart" onclick="clearCart()" />
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>--%>
    <asp:HiddenField ID="hfMaxPoint" runat="server" Value="" />
</asp:Content>
