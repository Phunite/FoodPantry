<%@ Page Title="" Language="C#" MasterPageFile="~/secure/CherryPantry.Master" AutoEventWireup="true" CodeBehind="Points.aspx.cs" Inherits="FoodPantry.Points" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <%--js plugins--%>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="plugin/dist/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="plugin/dist/rmodal.min.js"></script>
    <script src="js/Point.js"></script>

    <%--css stylesheets--%>
    <link href="css/Admin.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/rmodal.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/animate.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/all.min.css"/>
    <link href="css/Point.css" rel="stylesheet" />

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content" id="mainContent">
        <div class="row">
            <div class="col-lg-12">
                <div class="box box-primary">
                    <div class="box-header">
                        <div class="header-text">
                            <h3>Manage Points</h3>
                        </div>
                    </div>
                    <div class="box-body" style="text-align: center">
                        <%--<input
                            type="range"
                            min="1"
                            max="100"
                            step="1"
                            value="10"
                            data-orientation="horizontal"
                            class="rangeslider"/>
                    </div>--%>

                        <h5>Checkout Point Limit:</h5>
                        <div id="input-wrapper">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <button onclick="return false" class="btn btn-dark btn-sm" id="minus-btn"><i class="fa fa-minus"></i></button>
                                </div>
                                <input type="number" id="qty_input" class="form-control form-control-sm" value="1" min="1">
                                <div class="input-group-prepend">
                                    <button onclick="return false" class="btn btn-dark btn-sm" id="plus-btn"><i class="fa fa-plus"></i></button>
                                </div>
                            </div>
                        </div>

                        <div class="button-wrapper">
                            <input type="button" id="btnUpdate" class="btn btn-info" value="Update" />
                        </div>


                    </div>
                </div>

            </div>
</asp:Content>
