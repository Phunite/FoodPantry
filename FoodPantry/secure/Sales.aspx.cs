using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
namespace FoodPantry
{
    public partial class Sales : System.Web.UI.Page
    {
        static string connectionString = ConfigurationManager.ConnectionStrings["appString"].ConnectionString;

        protected void Page_Load(object sender, EventArgs e)
        {
            //try
            //{
            //    if (Session["Authenticated"].ToString() == "False")
            //    {
            //        Response.Redirect("Default.aspx");
            //    }
            //}
            //catch (Exception ex)
            //{
            //    Response.Redirect("Default.aspx");
            //}
        }
        [WebMethod]
        public static string GetAllReceipts()
        {

            try
            {
                DBConnect objDB = new DBConnect(connectionString);
                SqlCommand objCommand = new SqlCommand();
                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.CommandText = "GetAllReceipts";
                DataSet ds = objDB.GetDataSetUsingCmdObj(objCommand);
                ArrayList receiptList = new ArrayList();
                int count = 0;
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    count++;
                }
                if (ds.Tables[0].Rows.Count != 0)
                {
                    for (int i = 0; i < count; i++)
                    {                      
                        string order_Number = objDB.GetField("ReceiptID", i).ToString();
                        int personID = Convert.ToInt32(objDB.GetField("PersonID", i));
                        string FirstName = objDB.GetField("FirstName", i).ToString();
                        string LastName = objDB.GetField("LastName", i).ToString();
                        string checkoutDate = objDB.GetField("CheckoutDate", i).ToString();
                        string lastUpdateDate = objDB.GetField("LastUpdateDate", i).ToString();
                        int point = Convert.ToInt32(objDB.GetField("TotalPoints", i).ToString());
                        int totQty = Convert.ToInt32(objDB.GetField("TotalQuantity", i).ToString());
                        string lastUpdateUser = objDB.GetField("LastUpdateUser", i).ToString();

                        DateTime date = DateTime.Parse(checkoutDate);
                       
                        Receipt1 receipt = new Receipt1();

                        receipt.CheckoutDate = date.ToLongDateString();
                        receipt.ReceiptID = order_Number;
                        receipt.PersonID = personID;
                        receipt.TotalPoints = point;
                        receipt.TotalQuantity = totQty;
                        receipt.LastUpdateDate = lastUpdateDate;
                        receipt.LastUpdateUser = lastUpdateUser;
                        receipt.FirstName = FirstName;
                        receipt.LastName = LastName;


                        receiptList.Add(receipt);
                    }
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                for (int i = 0; i < receiptList.Count; i++)
                {

                }
                string jsonObj = js.Serialize(receiptList);
                return jsonObj;
            }
            catch (Exception ex)
            {
                ArrayList receiptList = new ArrayList();
                Receipt1 receipt = new Receipt1();

                receipt.CheckoutDate = DateTime.Now.ToString();
                receipt.ReceiptID = "0";
                receipt.PersonID = 0;
                receipt.TotalPoints = 0;
                receipt.TotalQuantity = 0;
                receipt.LastUpdateDate = "test";
                receipt.LastUpdateUser = HttpContext.Current.Session["Access_Net"].ToString();
                receipt.FirstName = "Exception";
                receipt.LastName = "Exception";
                receiptList.Add(receipt);

                JavaScriptSerializer js = new JavaScriptSerializer();
                string jsonObj = js.Serialize(receiptList);
                return jsonObj;
            }

        }

        public static string GetCategory(string upc)
        {
                DBConnect objDB = new DBConnect(connectionString);
            SqlCommand objCommand = new SqlCommand();
            objCommand.CommandType = CommandType.StoredProcedure;
            objCommand.CommandText = "GetUpcCategory";
            objCommand.Parameters.AddWithValue("@upc", upc);

            SqlParameter returnParameter = new SqlParameter("@category", SqlDbType.VarChar);

            returnParameter.Direction = ParameterDirection.ReturnValue;
            objCommand.Parameters.Add(returnParameter);
            DataSet ds = objDB.GetDataSetUsingCmdObj(objCommand);

            string category = objCommand.Parameters["@category"].Value.ToString();

            return category;
        }
        [WebMethod]
        public static string GetReceipt(string orderNumber)
        {
            try
            {
                DBConnect objDB = new DBConnect(connectionString);
                SqlCommand objCommand = new SqlCommand();
                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.CommandText = "GetUpcForOrder";
                objCommand.Parameters.AddWithValue("@ReceiptID", orderNumber);

                DataSet ds = objDB.GetDataSetUsingCmdObj(objCommand);
                Item s = new Item();

                int count = 0;
                ArrayList myItemList = new ArrayList();
                string SwalText = " <style> table,th,td {border:1px solid black;} </style> <table> <caption align='top'> Order Details </caption> <tr> <th> Category </th> <th> UPC </th> </tr>";
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    count++;
                }
                if (ds.Tables[0].Rows.Count != 0)
                {
                    for (int i = 0; i < count; i++)
                    {
                        Item myItem = new Item();
                        myItem.Category = objDB.GetField("Type", i).ToString();
                        myItem.Packaging = objDB.GetField("Packaging", i).ToString();
                        myItem.Quantity = Convert.ToInt32(objDB.GetField("Quantity", i));
                        myItem.Point = Convert.ToInt32(objDB.GetField("Point", i));
                        myItem.CategoryID = Convert.ToInt32(objDB.GetField("CategoryID", i));
                        myItemList.Add(myItem);

                    }

                }
                SwalText += "</table";
                JavaScriptSerializer jss = new JavaScriptSerializer();
                string output = jss.Serialize(myItemList);
                return output;


            }
            catch (Exception ex)
            {
                return "ex: " + ex.ToString();
            }
        }
    }
}