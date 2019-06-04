<%@ Page Title="" Language="C#" MasterPageFile="~/secure/CherryPantry.Master" AutoEventWireup="true" CodeBehind="DonationHistory.aspx.cs" Inherits="FoodPantry.DonationHistory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <script src="js/jquery-3.3.1.min.js"></script>
    <%--<link rel="stylesheet" type="text/css" href="css/inventory.css" />--%>
    <script type="text/javascript" src="js/datatables.min.js"></script>
    <script type="text/javascript" src="DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="DataTables/FixedColumns-3.2.5/js/dataTables.fixedColumns.js"></script>
    <script type="text/javascript" src="DataTables/DataTables-1.10.18/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="DataTables/Responsive-2.2.2/js/dataTables.responsive.min.js"></script>
    <script type="text/javascript" src="DataTables/Responsive-2.2.2/js/responsive.bootstrap4.min.js"></script>
    <script type="text/javascript" src="DataTables/AutoFill-2.3.2/js/dataTables.autoFill.min.js"></script>
    <script type="text/javascript" src="DataTables/AutoFill-2.3.2/js/autoFill.bootstrap4.min.js"></script>

    <%-- Export CDN--%>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.flash.min.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.html5.js"></script>
    <script type="text/javascript" src="DataTables/Buttons-1.5.4/js/buttons.print.js"></script>
    <script type="text/javascript" src="DataTables/JSZip-2.5.0/jszip.js"></script>
    <script type="text/javascript" src="DataTables/pdfmake-0.1.36/pdfmake.min.js"></script>
    <script type="text/javascript" src="DataTables/pdfmake-0.1.36/vfs_fonts.js"></script>
    <%-- Export END--%>


    <%--Modal start--%>
    <script type="text/javascript" src="plugin/dist/select2.full.min.js"></script>
    <script type="text/javascript" src="plugin/dist/rmodal.min.js"></script>
    <link rel="stylesheet" href="plugin/dist/rmodal.css" type="text/css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/animate.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/select2.min.css" />



    <%--modal end--%>
    <script type="text/javascript" src="plugin/dist/sweetalert2.all.min.js"></script>
    <link rel="stylesheet" type="text/css" href="plugin/dist/sweetalert2.min.css" />
    <script src="js/DonationDT.js"></script>
    <script src="js/Validate.js"></script>

    <%--<link rel="stylesheet" type="text/css" href="css/datatables.min.css"/>--%>
    <link rel="stylesheet" type="text/css" href="DataTables/Responsive-2.2.2/css/responsive.dataTables.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/Responsive-2.2.2/css/responsive.bootstrap4.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/FixedColumns-3.2.5/css/fixedColumns.dataTables.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/AutoFill-2.3.2/css/autoFill.dataTables.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/AutoFill-2.3.2/css/autoFill.bootstrap4.min.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/all.min.css"/>
    <link rel="stylesheet" type="text/css" href="css/inventory.css" />
    <link rel="stylesheet" type="text/css" href="tooltipster/dist/css/tooltipster.bundle.min.css" />
    <script type="text/javascript" src="tooltipster/dist/js/tooltipster.bundle.min.js"></script>
    <link href="tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-noir.min.css" rel="stylesheet" />
<%--    <link rel="stylesheet" href="css/inventory.css" type="text/css" />--%>
    <link rel="stylesheet" href="css/DonationHistory.css" type="text/css" />
    <script src="js/character-counter.js"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="modal" class="modal">
        <div class="modal-dialog animated">
            <div class="modal-content">
                    <div class="modal-header">
                        <strong>Edit Donation Details</strong>
                    </div>
                    <div class="modal-body">
                        <div class="modal-error"></div>
                        <div class="form-group">
                            
                            <div class='input-group w-100 p-3' style='display:none'>
                        <div class='input-group-prepend' style='width: 30%;' >
                          <span class='input-group-text w-100'>Donation ID</span>
                            </div>
                                <input id='txtDonationID' type='text' class='form-control'/>
                             </div>
                            <div class='input-group w-100 p-3' style='display:none'>
                        <div class='input-group-prepend' style='width: 30%;' >
                          <span class='input-group-text w-100'>Donor ID</span>
                            </div>
                                <input id='txtDonorID' type='text' class='form-control'/>
                             </div>

                             <div class='input-group w-100 p-3'>
                        <div class='input-group-prepend' style='width: 30%;' >
                          <span class='input-group-text w-100'>First Name</span>
                            </div>
                                <input id='txtFn' type='text' class='form-control'/>
                             </div>

                            <div class='input-group w-100 p-3'>
                        <div class='input-group-prepend' style='width: 30%;' >
                          <span class='input-group-text w-100'>Last Name</span>
                            </div>
                                <input id='txtLn' type='text' class='form-control'/>
                             </div>

                            <div class='input-group w-100 p-3'>
                        <div class='input-group-prepend' style='width: 30%;' >
                          <span class='input-group-text w-100'>Email</span>
                            </div>
                                <input id='txtEmail' type='text' class='form-control'/>
                             </div>
                               <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>Donor Type<span class="required">*</span></span>
                                </div>
                                <select class='form-control select2 select2-DonorType' id='selDonorType' style="width: 70%"></select>
                            </div>

                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>Donation Type<span class="required">*</span></span>
                                </div>
                                <select class='form-control select2 select2-DonationType' id='selDonationType' style="width: 70%; height:38px" ></select>
                            </div>

                            <div class='input-group w-100 p-3'>
                                     <div class='input-group-prepend' style='width: 30%;' >
                                        <span class='input-group-text w-100'>Organization</span>
                                    </div>
                                <input id='txtOrg' type='text' class='form-control'/>
                             </div>

                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;' >
                                    <span class='input-group-text w-100'>Donation Date</span>
                                </div>
                                    <input id='txtDonationDate' type='text' class='form-control' readonly/>
                             </div>
                            
                            
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button id="btnModalCancel" class="btn btn-default btn-cancel" type="button" onclick="modal.close();">Cancel</button>
                        <button id="btnModalSave" class="btn btn-primary btn-save" type="button";>Save</button>
                    </div>
            </div>
        </div>
    </div>
    <div class="content" id="mainContent">
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-primary">
                    <div class="box-header">
                        <h3>Donation History
                        </h3>
                    </div>
                    <div class="box-body">
                        <table id="donation-datatable" class="table table-hover <%--table-dark--%> nowrap" style="width: 100%">
                            <thead>
                                <tr>

                                    <th>Donation ID</th>
                                    <th>Donor ID</th>
                                    <th>Organization</th>
                                    <th>Last Name</th>
                                    <th>First Name</th>
                                    <th>Email</th>
                                    <th>Donor Type</th>
                                    <th>Donation Type</th>
                                    <th>Date</th>
                                    <th>Donation Detail</th>
                                    <th>Details</th>
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

