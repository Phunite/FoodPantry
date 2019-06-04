<%@ Page Title="" Language="C#" MasterPageFile="~/secure/CherryPantry.Master" AutoEventWireup="true" CodeBehind="ManageCategories.aspx.cs" Inherits="FoodPantry.ManageCategories" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <%--js libary--%>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script src="DataTables/datatables.min.js"></script>
    <script src="DataTables/Responsive-2.2.2/js/responsive.bootstrap.min.js"></script>
    <script src="DataTables/RowReorder-1.2.4/js/dataTables.rowReorder.js"></script>
    <script src="js/ManageCategory.js"></script>
    <script src="js/Validate.js"></script>
    <script type="text/javascript" src="plugin/dist/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="plugin/dist/rmodal.min.js"></script>
    <script type="text/javascript" src="tooltipster/dist/js/tooltipster.bundle.min.js"></script>
    <script src="tooltipster-discovery/tooltipster-discovery-master/tooltipster-discovery.js"></script>
    <script src="tooltipster-discovery/tooltipster-discovery-master/tooltipster-discovery.min.js"></script>
    <script type="text/javascript" src="plugin/dist/select2.full.min.js"></script>

    <%--css stylesheet--%>
    <link href="css/Admin.css" rel="stylesheet" />
    <link href="DataTables/datatables.min.css" rel="stylesheet" />
    <link href="DataTables/RowReorder-1.2.4/css/rowReorder.bootstrap4.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/animate.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/rmodal.css" />
    <link rel="stylesheet" type="text/css" href="tooltipster/dist/css/tooltipster.bundle.min.css" />
    <link href="tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-noir.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/select2.min.css" />


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="modal" class="modal">
        <div class="modal-dialog animated">
            <div class="modal-content">
                <form class="form-horizontal" method="get">
                    <div class="modal-header">
                        Add New Item
                    </div>

                    <div class="modal-body" id="CategoryModalBody">
                        <div class="modal-error"></div>
                        <div class="form-group">
                            <span class="error-text" id="error_category"></span>
                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 35%;'>
                                    <span class='input-group-text w-100'>Category Name<span class="required">*</span></span>
                                </div>
                                <input id='txtCategoryName' type='text' class='form-control' aria-label='Category' value='' />
                            </div>

                            <span class="error-text" id="error_package"></span>
                            <div class='input-group w-100 p-3'>
                                <div class='input-group-prepend' style='width: 35%;'>
                                    <span class='input-group-text w-100'>Packaging<span class="required">*</span></span>
                                </div>
                                <select class='form-control select2 select2-package' id='selPackageType' style="width: 65%"></select>
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
                            <h3>Manage Categories</h3>
                        </div>
                        <div class="header-button">
                            <button id="btnAddCategory" class="btn btn-success" type="button"><i class="material-icons">add_circle</i>Add Category</button>

                        </div>

                    </div>
                    <div class="box-body">
                        <table id="categoryTable" class="table table-bordered nowrap">
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th>Packaging</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                            <tfoot>
                                <tr>
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
