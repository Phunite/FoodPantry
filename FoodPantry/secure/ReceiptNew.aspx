<%@ Page Title="" Language="C#" MasterPageFile="~/secure/CherryPantry.Master" AutoEventWireup="true" CodeBehind="ReceiptNew.aspx.cs" Inherits="FoodPantry.ReceiptNew" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="js/datatables.min.js"></script>
    <script type="text/javascript" src="DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" charset="utf8" src="DataTables/FixedColumns-3.2.5/js/dataTables.fixedColumns.js"></script>
    <script type="text/javascript" src="DataTables/DataTables-1.10.18/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="DataTables/Responsive-2.2.2/js/dataTables.responsive.min.js"></script>
    <script type="text/javascript" src="DataTables/Responsive-2.2.2/js/responsive.bootstrap4.min.js"></script>
    <script type="text/javascript" src="DataTables/AutoFill-2.3.2/js/dataTables.autoFill.min.js"></script>
    <script type="text/javascript" src="DataTables/AutoFill-2.3.2/js/autoFill.bootstrap4.min.js"></script>
    <script type="text/javascript" src="tooltipster/dist/js/tooltipster.bundle.min.js"></script>

    <%-- Export CDN--%>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.flash.min.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.html5.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.print.js"></script>
    <script type="text/javascript" src="DataTables/JSZip-2.5.0/jszip.js"></script>
    <script type="text/javascript" src="DataTables/pdfmake-0.1.36/pdfmake.min.js"></script>
    <script type="text/javascript" src="DataTables/pdfmake-0.1.36/vfs_fonts.js"></script>
    <%-- Export END--%>

    <script type="text/javascript" src="plugin/dist/sweetalert2.all.min.js"></script>
    <script src="js/Receipt.js"></script>
    <link href="css/receipt.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/sweetalert2.min.css" />
    
  
    <%--<link rel="stylesheet" type="text/css" href="css/datatables.min.css"/>--%>
    <link rel="stylesheet" type="text/css" href="DataTables/Responsive-2.2.2/css/responsive.dataTables.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/Responsive-2.2.2/css/responsive.bootstrap4.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/FixedColumns-3.2.5/css/fixedColumns.dataTables.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/AutoFill-2.3.2/css/autoFill.dataTables.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/AutoFill-2.3.2/css/autoFill.bootstrap4.min.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/all.min.css"/>
    <link rel="stylesheet" type="text/css" href="tooltipster/dist/css/tooltipster.bundle.min.css" />
    <link href="tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-noir.min.css" rel="stylesheet" />

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-primary">
                    <div class="box-header">
                       <h3>Sales History</h3>
                    </div>
                    <div class="box-body">
                        <%--<h4>Export</h4>--%>
                    <table id="receiptDatatable" class="table table-striped table-hover table-bordered <%--table-dark--%>" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Order Number</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Checkout Date</th>
                                <th>Total Quantity</th>
                                <th>Total Points</th>                     
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                
                            </tr>
                        </tfoot>
                    </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</asp:Content>
