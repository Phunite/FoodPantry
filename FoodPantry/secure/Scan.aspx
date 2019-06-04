<%@ Page Title="" Language="C#" MasterPageFile="~/CherryPantry.Master" AutoEventWireup="true" CodeBehind="Scan.aspx.cs" Inherits="FoodPantry.Scan" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <link rel="stylesheet" href="css/scan.css" />
    <link href="QuaggaJS/example/css/styles.css" rel="stylesheet" />
    <link href="css/DatatableMaster.css" rel="stylesheet" />
    <link href="tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-noir.min.css" rel="stylesheet" />
    <script src="DataTables/datatables.min.js"></script>
    <link href="DataTables/datatables.min.css" rel="stylesheet" />
    <script src="DataTables/Responsive-2.2.2/js/responsive.bootstrap.min.js"></script>
    <%--<script src="DataTables/Responsive-2.2.2/js/dataTables.responsive.min.js"></script>--%>
    <%--<script src="js/scantest.js"></script>--%>

    <script src="js/Scan.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>

    <script type="text/javascript" src="https://unpkg.com/rmodal/dist/rmodal.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/animate.css/animate.css" type="text/css" />
    <link rel="stylesheet" href="https://unpkg.com/rmodal/dist/rmodal.css" type="text/css" />

    <link rel="stylesheet" type="text/css" href="tooltipster/dist/css/tooltipster.bundle.min.css" />
    <script type="text/javascript" src="tooltipster/dist/js/tooltipster.bundle.min.js"></script>
    <meta name="viewport" content="width=device-width; initial-scale=1.0; user-scalable=no" />

</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="PageTitle" runat="server">
    <%--    Checkout Items--%>
</asp:Content>


<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="modal" class="modal">
        <div class="modal-dialog animated">
            <div class="modal-content">
                <form class="form-horizontal" method="get">
                    <div class="modal-header">
                        <strong>Add New Item</strong>
                    </div>
                    <div class="modal-body">
                        <div class="modal-error"></div>
                        <div class="form-group">
                            <label for="txtUPC" class="control-label col-xs-4">UPC Code</label>
                            <div class="input-group-fluid col-xs-7">
                                <input type="text" id="txtUPC" class="form-control" readonly />
                            </div>
                            <label for="txtCategory" class="control-label col-xs-4">Category</label>
                            <div class="input-group-fluid col-xs-7">
                                <input type="text" id="txtCategory" class="form-control" />
                            </div>
                            <label for="txtWeight" class="control-label col-xs-4">Weight</label>
                            <div class="input-group-fluid col-xs-7">
                                <input type="text" id="txtWeight" class="form-control" />
                            </div>
                            <%--<label for="txtQuantity" class="control-label col-xs-4">Quantity</label>
                            <div class="input-group-fluid col-xs-7">
                                <input type="text" id="txtQuantity" class="form-control" />
                            </div>--%>
                            <label for="txtPoint" class="control-label col-xs-4">Point Value</label>
                            <div class="input-group-fluid col-xs-7">
                                <input type="text" id="txtPoint" class="form-control" />
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button id="btnModalCancel" class="btn btn-default" type="button" onclick="modal.close();">Cancel</button>
                        <button id="btnModalSave" class="btn btn-primary" type="button">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="content" id="mainContent">
        029385728395
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
    </div>
</asp:Content>
