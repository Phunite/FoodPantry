using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FoodPantry
{
    public partial class InventoryDatatable : System.Web.UI.Page
    {

        static string ConnectionString = ConfigurationManager.ConnectionStrings["appString"].ConnectionString;
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
        public static string GetAllItems()
        {
            DBConnect objDB = new DBConnect(ConnectionString);
            SqlCommand objCommand = new SqlCommand();
            ArrayList items = new ArrayList();

            objCommand.CommandType = CommandType.StoredProcedure;
            objCommand.CommandText = "Inventory-GetAllItems";     // identify the name of the stored procedure to execute

            DataSet myDS = objDB.GetDataSetUsingCmdObj(objCommand);
            int count = 0;

            foreach (DataRow row in myDS.Tables[0].Rows)
            {
                count++;
            }
            for (int i = 0; i < count; i++)
            {
                Item item = new Item();
                item.Upc = objDB.GetField("UPC", i).ToString();
                item.Category = objDB.GetField("Type", i).ToString();
                item.Packaging = objDB.GetField("Packaging", i).ToString();
                item.Quantity = Convert.ToInt32(objDB.GetField("Quantity", i));
                item.Weight = objDB.GetField("Weight", i).ToString();
                item.Point = Convert.ToInt32(objDB.GetField("Point", i));

                items.Add(item);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            string json = js.Serialize(items);
            return json;
        }

        [WebMethod]
        public static string GetAvailableItems()
        {
            DBConnect objDB = new DBConnect(ConnectionString);
            SqlCommand objCommand = new SqlCommand();
            ArrayList items = new ArrayList();

            objCommand.CommandType = CommandType.StoredProcedure;
            objCommand.CommandText = "Inventory-GetAvailableItems";     // identify the name of the stored procedure to execute

            // Execute the stored procedure using the DBConnect object and the SQLCommand object
            DataSet myDS = objDB.GetDataSetUsingCmdObj(objCommand);
            int count = 0;

            foreach (DataRow row in myDS.Tables[0].Rows)
            {
                count++;
            }
            for (int i = 0; i < count; i++)
            {
                Item item = new Item();
                item.Upc = objDB.GetField("UPC", i).ToString();
                item.Category = objDB.GetField("Type", i).ToString();
                item.Packaging = objDB.GetField("Packaging", i).ToString();
                item.Quantity = Convert.ToInt32(objDB.GetField("Quantity", i));
                item.Weight = objDB.GetField("Weight", i).ToString();
                item.Point = Convert.ToInt32(objDB.GetField("Point", i));

                items.Add(item);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            string json = js.Serialize(items);
            return json;
        }

        [WebMethod]
        public static string GetCategory()
        {
            DBConnect objDB = new DBConnect(ConnectionString);
            SqlCommand objCommand = new SqlCommand();
            ArrayList categories = new ArrayList();

            objCommand.CommandType = CommandType.StoredProcedure;
            objCommand.CommandText = "GetCategories";     // identify the name of the stored procedure to execute

            // Execute the stored procedure using the DBConnect object and the SQLCommand object
            DataSet myDS = objDB.GetDataSetUsingCmdObj(objCommand);
            int count = 0;

            foreach (DataRow row in myDS.Tables[0].Rows)
            {
                count++;
            }
            for (int i = 0; i < count; i++)
            {
                Category category = new Category();
                category.Type = objDB.GetField("Type", i).ToString();

                categories.Add(category);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            string json = js.Serialize(categories);
            return json;
        }

        [WebMethod]
        public static string GetPackaging()
        {
            DBConnect objDB = new DBConnect(ConnectionString);
            SqlCommand objCommand = new SqlCommand();
            ArrayList categories = new ArrayList();

            objCommand.CommandType = CommandType.StoredProcedure;
            objCommand.CommandText = "getPackages";     // identify the name of the stored procedure to execute

            DataSet myDS = objDB.GetDataSetUsingCmdObj(objCommand);
            int count = 0;

            foreach (DataRow row in myDS.Tables[0].Rows)
            {
                count++;
            }
            for (int i = 0; i < count; i++)
            {
                Category category = new Category();
                category.Packaging = objDB.GetField("Packaging", i).ToString();

                categories.Add(category);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            string json = js.Serialize(categories);
            return json;
        }

        [WebMethod]
        public static string UpdateItem(string Upc, string Category, string Packaging, string Weight, int Point,int Quantity)

        {
            try
            {
                DBConnect objDB = new DBConnect(ConnectionString);
                SqlCommand objCommand = new SqlCommand();
                ArrayList categories = new ArrayList();

                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.CommandText = "UpdateItem";     // identify the name of the stored procedure to execute

                objCommand.Parameters.AddWithValue("@UPC", Upc);
                objCommand.Parameters.AddWithValue("@Category", Category);
                objCommand.Parameters.AddWithValue("@Packaging", Packaging);
                objCommand.Parameters.AddWithValue("@Weight", Weight.ToString());
                objCommand.Parameters.AddWithValue("@Point", Convert.ToInt32(Point));
                objCommand.Parameters.AddWithValue("@Quantity", Convert.ToInt32(Quantity));
                objCommand.Parameters.AddWithValue("@Last_Update_User", HttpContext.Current.Session["Access_Net"].ToString());
                objCommand.Parameters.AddWithValue("@Last_Update_Date", DateTime.Now);

                objDB.DoUpdateUsingCmdObj(objCommand);
                return "true";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        [WebMethod]
        public static string AddToInventory(string Upc, int Category, string Weight, int Point, int Quantity)
        {
            try
            {
                DBConnect objDB = new DBConnect(ConnectionString);
                SqlCommand objCommand = new SqlCommand();

                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.CommandText = "AddToInventory";     // identify the name of the stored procedure to execute

                objCommand.Parameters.AddWithValue("@upc", Upc);
                objCommand.Parameters.AddWithValue("@categoryid", Convert.ToInt32(Category));
                objCommand.Parameters.AddWithValue("@weight", Weight.ToString());
                objCommand.Parameters.AddWithValue("@point", Convert.ToInt32(Point));
                objCommand.Parameters.AddWithValue("@quantity", Convert.ToInt32(Quantity));
                objCommand.Parameters.AddWithValue("@user", HttpContext.Current.Session["Access_Net"].ToString());
                objCommand.Parameters.AddWithValue("@date", DateTime.Now);

                objDB.DoUpdateUsingCmdObj(objCommand);

                return "true";
            }catch(Exception ex)
            {
                return "false";
            }
        }

      
    }
}