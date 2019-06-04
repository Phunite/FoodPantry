<%@ Page Title="" Language="C#" MasterPageFile="~/secure/CherryPantry.Master" AutoEventWireup="true" CodeBehind="Donation.aspx.cs" Inherits="FoodPantry.Donation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    <%--js library--%>
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="js/donationForm.js"></script>
    <script type="text/javascript" src="js/datatables.min.js"></script>
    <script type="text/javascript" src="js/Validate.js"></script>
    <script type="text/javascript" src="DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="DataTables/DataTables-1.10.18/js/dataTables.bootstrap4.min.js"></script>
    <script type="text/javascript" src="DataTables/FixedColumns-3.2.5/js/dataTables.fixedColumns.js"></script>
    <script type="text/javascript" src="plugin/dist/sweetalert2.all.min.js"></script>
    <script type="text/javascript" src="plugin/dist/select2.full.min.js"></script>
    <script src="plugin/dist/rmodal.min.js"></script>
    <script>
        function alertconfirmation() {
            Swal.fire(
                'Success',
                'Your donation was completed!',
                'success'
            ).then((result) => {
                window.location.href = window.location.href;
            });
        }
        function alertconfirmationError(text) {
                    Swal.fire(
                        'An Error Has Occured',
                        text,
                        'error'
                    )
                }
    </script>

    <%--css stylesheet--%>
    <link rel="stylesheet" type="text/css" href="css/DonationPage.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/DataTables-1.10.18/css/dataTables.bootstrap4.min.css" />
    <link rel="stylesheet" type="text/css" href="DataTables/FixedColumns-3.2.5/css/fixedColumns.dataTables.css" />
    <link rel="stylesheet" type="text/css" href="css/DatatableMaster.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/sweetalert2.min.css" />
    <link rel="stylesheet" type="text/css" href="plugin/dist/select2.min.css" />
    <link href="plugin/dist/rmodal.css" rel="stylesheet" />
    <link href="css/inventory.css" rel="stylesheet" />


</asp:Content>


<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="modal" class="modal">
        <div class="modal-dialog animated">
            <div class="modal-content">
                <div class="modal-header">
                    <strong>Edit Saved Donors</strong>
                </div>

                <div class="modal-body">
                    <div class="modal-error"></div>
                    <table id="donorTable" class="table table-hover nowrap table-border" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Saved Donor Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div class="modal-footer">
                    <button id="btnModalDone" class="btn btn-info" type="button">Done</button>
                    <%--<button id="btnModalSave" class="btn btn-save" type="button">Save</button>--%>
                </div>
            </div>
        </div>
    </div>

    <div class="content" id="mainContent">
        <div class="row">
            <div class="col-xs-12">
                <div class="box box-primary">
                    <div class="box-header">
                        <h3>New Donation</h3>
                    </div>
                    <div class="box-body">
                        <div class="form">

                            <div class="box-body">
                                <div class="form">

                                    <%-- testing select2--%>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <asp:Label ID="Label1" runat="server" Text="Saved Donors:"></asp:Label>
                                            <br />
                                            <select class="form-control select2-Donor" name="existingDonor" id="selectDonor" style="width: 100%">
                                            </select>
                                            <input type="button" id="btnSavedDonors" value="Edit Saved Donors" class="btn btn-info ">
                                        </div>
                                    </div>


                                    <%-- <div class="row mt-2">
                                        <div class="col-md-6">
                                            <asp:Label ID="lblDate" runat="server" Text="Date: "></asp:Label>
                                            <asp:TextBox ID="txtTodaysDate" runat="server" placeholder="" CssClass="form-control date" ReadOnly="true"></asp:TextBox>
                                        </div>
                                    </div>
                                    <br />--%>
                                    <br />
                                    <%--  row--%>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <asp:Label ID="lblDonorFirstName" runat="server" Text="First Name: "></asp:Label>
                                            <br />
                                            <input id="fname" type="text" name="fname" placeholder="First Name" class="form-control" pattern="[A-Za-z]+" />

                                        </div>
                                        <div class="col-md-6">
                                            <asp:Label ID="lblDonorLastName" runat="server" Text="Last Name: "></asp:Label>
                                            <br />
                                            <input id="lname" type="text" name="lname" placeholder="Last Name" class="form-control" pattern="[A-Za-z]+" />

                                        </div>
                                    </div>

                                    <%--    row--%>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <asp:Label ID="lblDonorType" runat="server" Text="Donor Type:* "></asp:Label>
                                            <br />
                                            <select id="donorType" class="form-control" name="donorType" required>
                                                <option value="0" disabled selected>Select Donor Type</option>
                                                <option value="Anonymous">Anonymous</option>
                                                <option value="Individual">Individual</option>
                                                <option value="Organization">Organization</option>
                                            </select>

                                        </div>
                                        <div class="col-md-6">
                                            <asp:Label ID="lblDonationType" runat="server" Text="Donation type:* "></asp:Label>
                                            <br />
                                            <select id="donationType" class="form-control" name="donationType" required>

                                                <option value="0" disabled selected>Select Donation Type</option>
                                                <option value="Donation">Donation</option>
                                                <option value="Purchased">Purchased</option>
                                            </select>

                                        </div>
                                    </div>

                                    <%--row--%>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <asp:Label ID="lblDonorEmail" runat="server" Text="Email Address: "></asp:Label>
                                            <br />
                                            <input type="email" id="emailAddress" name="email" placeholder="Email Address:" class="form-control" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />

                                        </div>
                                        <div class="col-md-6">
                                            <asp:Label ID="lblDonorOrganization" runat="server" Text="Organization/Department: "></asp:Label>
                                            <br />
                                            <input id="organization" type="text" name="organization" placeholder="Organization/Department" class="form-control" />
                                        </div>
                                    </div>

                                    <%-- row--%>
                                    <div class="row mt-2">
                                        <div class="col-md-6">
                                            <asp:Label ID="lblAffiliation" runat="server" Text="Temple Affiliation:*"></asp:Label>
                                            <br />
                                            <select id="templeAffiliation" class="form-control" name="templeAffiliation" required>
                                                <option value="0" disabled selected>Select Affiliation</option>
                                                <option value="Anonymous">Anonymous</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>

                                        </div>
                                        <div class="col-md-6">
                                            <asp:Label ID="lblDonorTUID" runat="server" Text="TUID: "></asp:Label>
                                            <br />
                                            <input id="tuid" type="text" name="tuid" placeholder="TUID:" class="form-control" minlength="9" maxlength="9" pattern="^(0|[1-9][0-9]*)$" />
                                        </div>
                                    </div>

                                    <div class="row mt-2">

                                        <div class="col-md-12">
                                            <asp:Label ID="lblDetail" runat="server" Text="Donation Detail: "></asp:Label>
                                            <span id="chars">250</span> characters remaining.
                                    <br />
                                            <textarea id="donationDetail" name="donationDetail" placeholder="Donation Detail" class="form-control" rows="5" cols="50" maxlength="250"></textarea>
                                        </div>
                                    </div>

                                    <div class="row mt-2">
                                        <div id="checkbox-wrapper">
                                            <input type="checkbox" id="chkSaveDonor">Save donor as a Saved Donor.
                                            <br />
                                            <input type="text" id="txtSaveDonor" name="txtSaveDonor" class="form-control" placeholder="Saved Donor Name" />
                                        </div>
                                    </div>

                                    <div class="row mt-2">
                                        <div class="buttonWrapper">
                                            <button id="btnClear" class="btn btn-warning" value="Submit" onclick="return false;">Clear</button>
                                            <%--<asp:Button ID="Submit" runat="server" Text="Submit" CssClass="btn btn-success formsubmitbtn" OnClientClick="return validateDonation();" OnClick="btnSubmitDonor_Click" />--%>
                                             <button id="btnSubmitDonor" class="btn btn-success" value="Submit" onclick="return false;">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</asp:Content>
