<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="test.aspx.cs" Inherits="FoodPantry.secure.test" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            UPC:
            <asp:TextBox ID="txtUPC" runat="server"></asp:TextBox>
            Category:
            <asp:TextBox ID="txtCategory" runat="server"></asp:TextBox>
            Packaging:
            <asp:TextBox ID="txtPackaging" runat="server"></asp:TextBox>
            Weight:
            <asp:TextBox ID="txtWeight" runat="server"></asp:TextBox>
            Point:
            <asp:TextBox ID="txtPoint" runat="server"></asp:TextBox>
            
            <asp:Button ID="btn" runat="server" text="submit" OnClick="btn_Click" />
        </div>
    </form>
</body>
</html>
