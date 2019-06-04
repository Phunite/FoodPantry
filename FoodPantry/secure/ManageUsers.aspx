<%@ Page Title="" Language="C#" MasterPageFile="~/secure/CherryPantry.Master" AutoEventWireup="true" CodeBehind="ManageUsers.aspx.cs" Inherits="FoodPantry.ManageUsers" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <%--js plugins--%>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script src="DataTables/datatables.min.js"></script>
    <script src="DataTables/Responsive-2.2.2/js/responsive.bootstrap.min.js"></script>
    <script src="DataTables/RowReorder-1.2.4/js/dataTables.rowReorder.js"></script>
    <script src="js/ManageUsers.js"></script>
    <script src="js/Validate.js"></script>
    <script type="text/javascript" src="plugin/dist/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="plugin/dist/rmodal.min.js"></script>
    <script type="text/javascript" src="tooltipster/dist/js/tooltipster.bundle.min.js"></script>

    <%--css stylesheets--%>
    <link href="css/Admin.css" rel="stylesheet" />
    <link href="DataTables/datatables.min.css" rel="stylesheet" />
    <link href="DataTables/RowReorder-1.2.4/css/rowReorder.bootstrap4.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/animate.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/rmodal.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/sweetalert2.min.css" />
    <link rel="stylesheet" type="text/css" href="tooltipster/dist/css/tooltipster.bundle.min.css" />
    <link href="tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-noir.min.css" rel="stylesheet" />


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="modal" class="modal">
        <div class="modal-dialog animated">
            <div class="modal-content">
                <form class="form-horizontal" method="get">
                    <div class="modal-header">
                        <strong>Add New Item</strong>
                    </div>
                    <div class="modal-body" id="UserModalBody">
                        <div class="modal-error"></div>
                        <div class="form-group">
                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>First Name<span class="required">*</span></span>
                                </div>
                                <input id='txtFirstName' type='text' class='form-control' readonly aria-label='First Name' value='' />
                            </div>
                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>Last Name<span class="required">*</span></span>
                                </div>
                                <input id='txtLastName' type='text' class='form-control' readonly aria-label='Last Name' value='' />
                            </div>
                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>AccessNet<span class="required">*</span></span>
                                </div>
                                <input id='txtAccessNet' type='text' class='form-control' readonly aria-label='Accessnet' value='' />
                            </div>
                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>Role<span class="required">*</span></span>
                                </div>
                                <div class="input-group-fluid col-xs-7" style="width:70%">
                                    <select class="form-control" id="selRoles" required="">
                                        <option>Admin</option>
                                        <option>Volunteer</option>
                                    </select>
                                </div>
                            </div>
                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 30%;'>
                                    <span class='input-group-text w-100'>Status<span class="required">*</span></span>
                                </div>
                                <div class="input-group-fluid col-xs-7" style="width:70%">
                                    <select class="form-control" id="selStatus" required="">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="modal-footer" id="UpdateModalFooter">
                        <button id="btnModalCancelUpdate" class="btn btn-cancel" type="button" onclick="modal.close();">Cancel</button>
                        <button id="btnModalSave" class="btn btn-save" type="button">Save</button>
                    </div>
                    <div class="modal-footer" id="AddModalFooter">
                        <button id="btnModalCancelAdd" class="btn btn-default" type="button" onclick="modal.close();">Cancel</button>
                        <button id="btnModalAdd" class="btn btn-success" type="button">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="content" id="mainContent">
        <div class="row">
            <div class="col-lg-12">
                <div class="box box-primary">
                    <div class="box-header">
                        <div class="header-text">
                            <h3>Manage Users</h3>
                        </div>
                        <div class="header-button">
                            <button id="btnAddUser" class="btn btn-success" type="button"><i class="material-icons">add_circle</i>Add User</button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div id="alert-wrappper">
                        </div>
                        <table id="userTable" class="table table-bordered nowrap">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>AccessNet ID</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</asp:Content>
