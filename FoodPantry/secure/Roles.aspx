<%@ Page Title="Roles" Language="C#" MasterPageFile="~/secure/FoodPantry.Master" AutoEventWireup="true" CodeBehind="Roles.aspx.cs" Inherits="WebApplication1.Roles" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<link rel="stylesheet" type="text/css" href="css/style.css" />
<script runat="server">
	protected void Button1_Click(object sender, System.EventArgs e)
	{
		TextBox1.Visible = true;
		txtval9.Visible = true;
		txtval10.Visible = true;
		DropDownList1.Visible = true;
		Button2.Visible = true;


	}
	protected void Button2_Click(object sender, System.EventArgs e)
	{
		TextBox1.Visible = false;
		txtval9.Visible = false;
		txtval10.Visible = false;
		DropDownList1.Visible = false;
		Button2.Visible = false;
	}
</script>
<div class="container">
<div class="row">
    <div class="col-auto">
        <div class="col-lg-9 col-md-4 control-label">
            <h1>Users</h1>
        </div>
        <div class="usertypediv">
            <asp:Label ID="Label16" runat="server" Text="User Status: "></asp:Label>
            <asp:DropDownList ID="ddlFilter" AutoPostBack="true" OnSelectedIndexChange="Inactive" runat="server" CssClass="form-control inventoryddl">
                <asp:ListItem>Active</asp:ListItem>
                <asp:ListItem>Inactive</asp:ListItem>

            </asp:DropDownList>
                </div>
        <div class="col-lg-9 col-md-8">
            <asp:Button ID="Button1" Text="Add" OnClick="Button1_Click" runat="server" Class="btn btn-primary" />
        </div>
    </div>
</div>

<!---->
	
	
<div class="row">
	<div class="col-2">
		<div class="col-lg-9 col-md-3 control-label">
			<h3>First Name</h3>
		</div>
	</div>
    <div class="col-2">
        <div class="col-lg-9 col-md-3 control-label">
            <h3>Last Name</h3>
        </div>
    </div>

	<div class="col-2">
		<div class="col-lg-9 col-xs-3 control-label">
			<h3>Email</h3>
		</div>
	</div>
	<div class="col-2">
		<div class="col-lg-9 col-md-3 control-label">
			<h3>Role</h3>
		</div>
	</div>
</div>

<!---->
<div class="row">

	<br />
	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<asp:TextBox ID="txtval9" visible="false" runat="server" CssClass="form-control"></asp:TextBox>
		</div>
	</div>

    <div class="col-2">
        <div class="col-lg-9 col-md-8">
            <asp:TextBox ID="TextBox1" visible="false" runat="server" CssClass="form-control"></asp:TextBox>
        </div>
    </div>

	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<asp:TextBox ID="txtval10" visible="false" runat="server" CssClass="form-control"></asp:TextBox>
		</div>
	</div>

	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<asp:DropDownList class="btn btn-secondary dropdown-toggle" visible="false" ID="DropDownList1" runat="server">
				<asp:ListItem Enabled="true" Text="Select Role" Value="-1"></asp:ListItem>
				<asp:ListItem Text="Admin" Value="1"></asp:ListItem>
				<asp:ListItem Text="Volunteer" Value="2"></asp:ListItem>
			</asp:DropDownList>
		</div>
	</div>

	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<asp:Button ID="Button2" visible="false" Text="Save" OnClick="Button2_Click" runat="server" Class="btn btn-primary" />
		</div>
	</div>

</div>
<hr />

<!---->
<div class="row">
	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<h5>Andy</h5>
		</div>
	</div>

    <div class="col-2">
        <div class="col-lg-9 col-md-8">
            <h5>Dwyer</h5>
        </div>
    </div>

	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<h5>tug40681@temple.edu</h5>
		</div>
	</div>

	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<h5>Admin</h5>
		</div>
	</div>

	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<asp:Button ID="btnEdit" Text="Edit" runat="server" Class="btn btn-primary" />
		</div>
	</div>
	
	
	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<asp:Button ID="btnRemove" Text="Deactivate" runat="server" Class="btn btn-primary" />
		</div>
	</div>
</div>
<hr />

<!---->
<div class="row">
	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<h5>Leslie</h5>
		</div>
	</div>

    <div class="col-2">
        <div class="col-lg-9 col-md-8">
            <h5>Knope</h5>
        </div>
    </div>

	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<h5>tug40681@temple.edu</h5>
		</div>
	</div>

	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<h5>Volunteer</h5>
		</div>
	</div>

	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<asp:Button ID="btnEdit2" Text="Edit" runat="server" Class="btn btn-primary" />
		</div>
	</div>

	<div class="col-2">
		<div class="col-lg-9 col-md-8">
			<asp:Button ID="btnRemove2" Text="Deactivate" runat="server" Class="btn btn-primary" />
		</div>
	</div>
</div>

</div>
</asp:content>
