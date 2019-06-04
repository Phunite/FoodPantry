<%@ Page Title="" Language="C#" MasterPageFile="~/CherryPantry.Master" AutoEventWireup="true" CodeBehind="DonationPage2.aspx.cs" Inherits="FoodPantry.DonationPage2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/donationTest.js"></script>
    <script type="text/javascript" src="js/datatables.min.js"></script>
    <script type="text/javascript" src="DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="DataTables/DataTables-1.10.18/js/dataTables.bootstrap4.min.js"></script>
    <%-- <link rel="stylesheet" type="text/css" href="css/datatables.min.css"/>--%>
    <link rel="stylesheet" href="DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/FixedColumns-3.2.5/css/fixedColumns.dataTables.css" />
    <script type="text/javascript" charset="utf8" src="DataTables/FixedColumns-3.2.5/js/dataTables.fixedColumns.js"></script>
    <link rel="stylesheet" type="text/css" href="css/DatatableMaster.css" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>
    <script src="js/DonationForm.js"></script>
    <script>
        function alertconfirmation() {
            Swal.fire(
                'Success',
                'Your donation was completed!',
                'success'
            )
        }
    </script>
    
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="PageTitle" runat="server">
    <%--Donation Application--%>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="content" id="mainContent">
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-primary">
                    <div class="box-header">
                        <h3>New Donation</h3>
                    </div>


                     <div class="box-body">
                           <div class="form">

                              <%-- testing select2--%>
                            <div class="row mt-2">
                                   <div class="col-md-6">
                                        <asp:Label ID="Label1" runat="server" Text="Returning Donor:"></asp:Label>
                                 <select class="form-control select2-package" id="selectDonor" style="width: 100%" required="">
                                </select>
                                </div>
                            </div>

                            <div class="row mt-2">
                                   <div class="col-md-6">
                                    <asp:Label ID="lblRegularDonor" runat="server" Text="Returning Donor:"></asp:Label>
                                    <asp:DropDownList ID="ddlDonorList" AutoPostBack="true" runat="server" CssClass="form-control" OnSelectedIndexChanged="ddlDonorList_SelectedIndexChanged1">
                                    </asp:DropDownList>
                                </div>
                            </div>


                  <%--  <div class="box-body">--%>
                       <%-- <div class="form">--%>
                            <div class="row mt-2">
                                <%--<div class="col-md-6">
                                    <asp:Label ID="lblRegularDonor" runat="server" Text="Regular Donors:"></asp:Label>
                                    <asp:DropDownList ID="ddlDonorList" AutoPostBack="true" runat="server" CssClass="form-control" OnSelectedIndexChanged="ddlDonorList_SelectedIndexChanged1">
                                    </asp:DropDownList>
                                </div>--%>

                                <div class="col-md-6">
                                    <asp:Label ID="lblDate" runat="server" Text="Date: "></asp:Label>
                                    <asp:TextBox ID="txtTodaysDate" runat="server" placeholder="" CssClass="form-control" ReadOnly="true"></asp:TextBox>
                                </div>
                            </div>
                            <br />
                            <br />
                            <%--  row--%>
                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <asp:Label ID="lblDonorFirstName" runat="server" Text="First Name: "></asp:Label>
                                    <asp:TextBox ID="txtFirst" runat="server" placeholder="First Name" CssClass="form-control"></asp:TextBox>
                                    <asp:RequiredFieldValidator runat="server" ID="reqFirstName" ControlToValidate="txtFirst" ErrorMessage="Please enter a first name." Font-Bold="true">
                                    </asp:RequiredFieldValidator>
                                    <asp:RegularExpressionValidator ID="validateFirstName" runat="server" ControlToValidate="txtFirst" ValidationExpression="^[a-zA-Z''-'\s]{1,40}$" ErrorMessage="Please enter a valid first name." Font-Bold="true"></asp:RegularExpressionValidator>

                                </div>
                                <div class="col-md-6">
                                    <asp:Label ID="lblDonorLastName" runat="server" Text="Last Name: "></asp:Label>
                                    <asp:TextBox ID="txtLast" runat="server" placeholder="Last Name" CssClass="form-control"></asp:TextBox>
                                    <asp:RequiredFieldValidator runat="server" ID="reqLastName" ControlToValidate="txtLast" ErrorMessage="Please enter a last name." Font-Bold="true">
                                    </asp:RequiredFieldValidator>
                                    <asp:RegularExpressionValidator ID="validateLastName" runat="server" ControlToValidate="txtLast" ValidationExpression="^[a-zA-Z''-'\s]{1,40}$" ErrorMessage="Please enter a valid last name." Font-Bold="true"></asp:RegularExpressionValidator>

                                </div>
                            </div>

                            <%--    row--%>
                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <asp:Label ID="lblDonorType" runat="server" Text="Donor Type: "></asp:Label>
                                    <asp:DropDownList ID="ddlDonorType" runat="server" CssClass="form-control">
                                        <asp:ListItem>Select Donor Type</asp:ListItem>
                                        <asp:ListItem>Individual</asp:ListItem>
                                        <asp:ListItem>Organization</asp:ListItem>
                                        <asp:ListItem>Anonymous</asp:ListItem>
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator runat="server" ID="reqDonorType" ControlToValidate="ddlDonorType" InitialValue="Select Donor Type" ErrorMessage="Please select a donor type." Font-Bold="true">
                                    </asp:RequiredFieldValidator>
                                </div>
                                <div class="col-md-6">
                                    <asp:Label ID="lblDonationType" runat="server" Text="Donation type: "></asp:Label>
                                    <asp:DropDownList ID="ddlDonationType" runat="server" CssClass="form-control">
                                        <asp:ListItem>Select Donation Type</asp:ListItem>
                                        <asp:ListItem>Donation</asp:ListItem>
                                        <asp:ListItem>Purchased</asp:ListItem>
                                        <asp:ListItem>Anonymous</asp:ListItem>
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator runat="server" ID="reqDonationType" ControlToValidate="ddlDonationType" InitialValue="Select Donation Type" ErrorMessage="Please select a donation type." Font-Bold="true">
                                    </asp:RequiredFieldValidator>
                                </div>
                            </div>

                            <%--row--%>
                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <asp:Label ID="lblDonorEmail" runat="server" Text="Email: "></asp:Label>
                                    <asp:TextBox ID="txtEmail" runat="server" TextMode="Email" placeholder="Email Address" CssClass="form-control"></asp:TextBox>
                                    <asp:RequiredFieldValidator runat="server" ID="reqEmail" ControlToValidate="txtEmail" ErrorMessage="Please enter email address." Font-Bold="true">
                                    </asp:RequiredFieldValidator>
                                    <asp:RegularExpressionValidator ID="validateEmail" runat="server" ControlToValidate="txtEmail" ErrorMessage="Please enter a valid email address." ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" Font-Bold="true"></asp:RegularExpressionValidator>

                                </div>
                                <div class="col-md-6">
                                    <asp:Label ID="lblDonorOrganization" runat="server" Text="Organization: "></asp:Label>
                                    <asp:TextBox ID="txtDonorOrganization" runat="server" placeholder="Organaziation Name" CssClass="form-control"></asp:TextBox>
                                    <asp:RegularExpressionValidator ID="validateOrganization" runat="server" ControlToValidate="txtDonorOrganization" ValidationExpression="^[a-zA-Z0-9& ]*$" ErrorMessage="Please enter a valid organization name." Font-Bold="true"></asp:RegularExpressionValidator>

                                </div>
                            </div>

                            <%-- row--%>
                            <div class="row mt-2">
                                <div class="col-md-6">
                                    <asp:Label ID="lblAffiliation" runat="server" Text="Temple Affilation:"></asp:Label>
                                    <asp:DropDownList ID="ddlTempleAffil" runat="server" CssClass="form-control">
                                        <asp:ListItem>Select Affiliation</asp:ListItem>
                                        <asp:ListItem>Yes</asp:ListItem>
                                        <asp:ListItem>No</asp:ListItem>
                                        <asp:ListItem>Anonymous</asp:ListItem>
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator runat="server" ID="reqAffiliation" ControlToValidate="ddlTempleAffil" InitialValue="Select Affiliation" ErrorMessage="Please select temple affiliation." Font-Bold="true">
                                    </asp:RequiredFieldValidator>
                                </div>
                                <div class="col-md-6">
                                    <asp:Label ID="lblDonorTUID" runat="server" Text="TUID: "></asp:Label>
                                    <asp:TextBox ID="txtTUID" runat="server" placeholder="TUID" CssClass="form-control"></asp:TextBox>
                                    <asp:RegularExpressionValidator ID="validateID" runat="server" ControlToValidate="txtTUID" ValidationExpression="\d{9}" ErrorMessage="TU ID must contain 9 numeric digits." Font-Bold="true"></asp:RegularExpressionValidator>

                                </div>
                            </div>

                            <div class="row mt-2">

                                <div class="col-md-12">
                                    <asp:Label ID="lblDetail" runat="server" Text="Donation Detail: "></asp:Label>
                                    <asp:TextBox ID="txtDetail" runat="server" TextMode="multiline" Columns="50" Rows="5" placeholder="Details" CssClass="form-control"></asp:TextBox>

                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="buttonWrapper">
                                    <asp:Button ID="btnSubmitDonor" Text="Submit" runat="server" Class="btn btn-success  center-button" OnClick="btnSubmitDonor_Click" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>

    <%--   <div class="col-md-12">
            <table id="donation-datatable" class="table table-striped"> 
                <thead>
                    <tr>
                        <th><h3>Donation ID</h3></th>
                        <th><h3>Date</h3></th>
                        <th><h3> Donation Type</h3></th>
                        <th><h3>Donor Type</h3></th>
                        <th><h3>Name</h3></th>
                        <th><h3>Temple Affiliation</h3></th>
                        <th><h3>TuID</h3></th>
                        <th><h3>Email</h3></th>
                </tr>
            </thead>
            <tbody>         
            </tbody>     
        </table>
    </div>--%>
</asp:Content>
