<%@ Page Title="" Language="C#" MasterPageFile="~/secure/CherryPantry.Master" AutoEventWireup="true" CodeBehind="Inventory.aspx.cs" Inherits="FoodPantry.InventoryDatatable" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />


    <%--js plugins--%>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="js/datatables.min.js"></script>
    <script type="text/javascript" src="DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="DataTables/FixedColumns-3.2.5/js/dataTables.fixedColumns.js"></script>
    <script type="text/javascript" src="DataTables/DataTables-1.10.18/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="DataTables/Responsive-2.2.2/js/dataTables.responsive.min.js"></script>
    <script type="text/javascript" src="DataTables/Responsive-2.2.2/js/responsive.bootstrap4.min.js"></script>
    <script type="text/javascript" src="DataTables/AutoFill-2.3.2/js/dataTables.autoFill.min.js"></script>
    <script type="text/javascript" src="DataTables/AutoFill-2.3.2/js/autoFill.bootstrap4.min.js"></script>

    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.flash.min.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.html5.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.print.js"></script>
    <script type="text/javascript" src="DataTables/JSZip-2.5.0/jszip.js"></script>
    <script type="text/javascript" src="DataTables/pdfmake-0.1.36/pdfmake.min.js"></script>
    <script type="text/javascript" src="DataTables/pdfmake-0.1.36/vfs_fonts.js"></script>

    <script type="text/javascript" src="js/Validate.js"></script>
    <script type="text/javascript" src="js/Inventory.js"></script>
    <script type="text/javascript" src="tooltipster/dist/js/tooltipster.bundle.min.js"></script>
    <script type="text/javascript" src="plugin/dist/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="plugin/dist/select2.full.min.js"></script>
    <script type="text/javascript" src="plugin/dist/rmodal.min.js"></script>

   

    <%--css stylesheets--%>
    <link rel="stylesheet" type="text/css" href="DataTables/Responsive-2.2.2/css/responsive.dataTables.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/Responsive-2.2.2/css/responsive.bootstrap4.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/FixedColumns-3.2.5/css/fixedColumns.dataTables.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/AutoFill-2.3.2/css/autoFill.dataTables.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/AutoFill-2.3.2/css/autoFill.bootstrap4.min.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/all.min.css" />
    <link rel="stylesheet" type="text/css" href="css/Inventory.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/sweetalert2.min.css" />
    <link rel="stylesheet" type="text/css" href="tooltipster/dist/css/tooltipster.bundle.min.css" />
    <link rel="stylesheet" type="text/css" href="tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-noir.min.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/animate.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/rmodal.css" />
    <link rel="stylesheet" type="text/css" href="tooltipster/dist/css/tooltipster.bundle.min.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/select2.min.css" />

       <%-- Export CDN--%>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.flash.min.js"></script>
      <script type="text/javascript" src="DataTables/JSZip-2.5.0/jszip.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.html5.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.print.js"></script>
    <script type="text/javascript" src="DataTables/pdfmake-0.1.36/pdfmake.min.js"></script>
    <script type="text/javascript" src="DataTables/pdfmake-0.1.36/vfs_fonts.js"></script>
    <%-- Export END--%>

</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


    <div id="modal" class="modal">
        <div class="modal-dialog animated">
            <div class="modal-content">
                <div class="modal-header">
                    <strong>Edit Item Details</strong>

                </div>
                <div class="modal-body">
                    <div class="modal-error"></div>
                    <div class="form-group">
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
                                <span class='input-group-text w-100'>Quantity<span class="required">*</span></span>
                            </div>
                            <input type="text" id="txtQuantity" class="form-control" />
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
            </div>
        </div>
    </div>

    <div class="content" id="mainContent">
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-primary">
                    <div class="box-header d-flex justify-content-between">
                        <div class="row switch-row">
                            <h3>Inventory</h3>
                            <label class="switch">
                                <input id="tabletoggle" type="checkbox">
                                <span class="slider round tooltipper" title='Toggle to view all items'></span>
                                <span class="none-active tooltipper" title='Toggle to view items in stock'>All</span>
                            </label>
                        </div>
                        <div class="header-button">
                        </div>
                    </div>
                    <div class="box-body">
                        <table id="inventory-datatable" class="table table-hover nowrap table-border" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>UPC/Name</th>
                                    <th>Category</th>
                                    <th>Packaging</th>
                                    <th>Quantity</th>
                                    <th>Weight</th>
                                    <th>Point</th>
                                    <th>Edit</th>
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
                    <div id="export">

                    </div>
                </div>
            </div>
        </div>
    </div>
    <%--<div class="lds-default" id="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>--%>
</asp:Content>
