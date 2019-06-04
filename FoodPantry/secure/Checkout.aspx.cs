using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Collections;
using System.Collections.Generic;


namespace FoodPantry
{
    public partial class Checkout : System.Web.UI.Page
    {
        static string connectionStr = ConfigurationManager.ConnectionStrings["appString"].ConnectionString;

        protected void Page_Load(object sender, EventArgs e)
        {
            ////  HttpContext.Current.Session.Abandon();
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
            //hfMaxPoint.Value = getMaxPoint().ToString();
        }

        [WebMethod]
        public static string getCategories()
        {
            try
            {
                ArrayList items = new ArrayList();
                DBConnect objDB = new DBConnect(connectionStr);

                //string query = "SELECT i.upc, c.Type, c.Packaging FROM dbo.Inventory i JOIN dbo.Category c ON i.CategoryID = c.Id ORDER BY c.Type";

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "_scan-GetCategories";
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    InventoryItem item = new InventoryItem();

                    item.Id = dr["Id"].ToString();
                    item.Category = dr["Type"].ToString();
                    item.Packaging = dr["Packaging"].ToString();
                    

                    //Category cat = new Category();
                    //cat.Type = dr["Type"].ToString();
                    //cat.Packaging = dr["Packaging"].ToString();
                    //cat.Id = dr["Id"].ToString();

                    items.Add(item);
                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(items);
            }
            catch (Exception ex)
            {
                return "error: " + ex.Message;
            }

        }

        [WebMethod]
        public static string getCategoriesSearch(string search)
        {
            try
            {
                ArrayList items = new ArrayList();
                DBConnect objDB = new DBConnect(connectionStr);
                //string query = "SELECT i.upc, c.Type, c.Packaging FROM dbo.Inventory i JOIN dbo.Category c ON i.CategoryID = c.Id WHERE c.Packaging IS NOT NULL AND c.Type LIKE '%" + search + "%' ORDER BY c.Type;";

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "_scan-GetCategoriesSearch";
                cmd.Parameters.AddWithValue("@search", search);
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    InventoryItem item = new InventoryItem();

                    item.Id = dr["Id"].ToString();
                    item.Category = dr["Type"].ToString();
                    item.Packaging = dr["Packaging"].ToString();

                    //Category cat = new Category();
                    //cat.Type = dr["Type"].ToString();
                    //cat.Packaging = dr["Packaging"].ToString();
                    //cat.Id = dr["Id"].ToString();

                    items.Add(item);
                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(items);
            }
            catch (Exception ex)
            {
                return "error: " + ex.Message;
            }

        }

        [WebMethod]
        public static string getCategoryID(string UPC)
        {
            try
            {
                DBConnect objDB = new DBConnect(connectionStr);

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "_scan2-GetCategoryID";
                cmd.Parameters.AddWithValue("@UPC", UPC);
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                string catID = "";

                if (ds.Tables[0].Rows.Count == 1)
                {
                    catID = ds.Tables[0].Rows[0][0].ToString();
                }

                return catID;
            }
            catch (Exception ex)
            {
                return "error";
            }
        }

        [WebMethod]
        public static string getPointValue(string category, string packaging)
        {
            try
            {
                DBConnect objDB = new DBConnect(connectionStr);

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "_scan2-GetPointValue";
                cmd.Parameters.AddWithValue("@category", category);
                cmd.Parameters.AddWithValue("@packaging", packaging);
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                string point = "";

                if (ds.Tables[0].Rows.Count > 0)
                {
                    point = ds.Tables[0].Rows[0][0].ToString();
                }

                return point;
            }
            catch (Exception ex)
            {
                return "Not Found";
            }
        }

        [WebMethod]
        public static string CheckInventory(string Id)
        {

            Item item = new Item();
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            DataSet ds;

            int MAX_POINTS = getMaxPoint();
            int cartPoints;

            try
            {

                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "_scan2-GetItem";
                cmd.Parameters.AddWithValue("@ID", Id);
                ds = objDB.GetDataSetUsingCmdObj(cmd);



                //Item Found
                if (ds.Tables[0].Rows.Count != 0)
                {
                    item.Upc = ds.Tables[0].Rows[0]["UPC"].ToString();
                    item.Category = ds.Tables[0].Rows[0]["Type"].ToString();
                    item.Weight = ds.Tables[0].Rows[0]["Weight"].ToString();
                    item.Point = Convert.ToInt32(ds.Tables[0].Rows[0]["Point"]);
                    item.Packaging = ds.Tables[0].Rows[0]["Packaging"].ToString();
                    item.Quantity = 1;
                    item.CategoryID = Convert.ToInt32(ds.Tables[0].Rows[0]["CategoryID"]);
                }
                //Item Not Found
                else
                {
                    item = new Item(Id, "Item Not Found", 0);
                }


                cartPoints = addToCart(item);

                if (cartPoints > MAX_POINTS)
                {
                    item.Flag = "true";
                }


                return javaScriptSerializer.Serialize(item);
            }
            catch (Exception ex)
            {
                item = new Item(Id, "Item Not Found", 0);
                return javaScriptSerializer.Serialize(item);
            }
        }

        [WebMethod]
        public static string AddToInventory(string Upc, string Category, string Packaging, string Weight, int Point, int Quantity)
        {
            try
            {
                DBConnect objDB = new DBConnect(connectionStr);

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "_scan-AddCategory";
                cmd.Parameters.AddWithValue("@type", Category);
                cmd.Parameters.AddWithValue("@packaging", Packaging);
                cmd.Parameters.AddWithValue("@last_update_user", HttpContext.Current.Session["Access_Net"].ToString());
                cmd.Parameters.AddWithValue("@last_update_date", DateTime.Today);
                cmd.Parameters.Add("@CatID", SqlDbType.Int).Direction = ParameterDirection.Output;

                SqlConnection sqlConnection = new SqlConnection(connectionStr);
                int returnInt;

                try
                {
                    cmd.Connection = sqlConnection;
                    cmd.Connection.Open();
                    returnInt = cmd.ExecuteNonQuery();
                    cmd.Connection.Close();

                }
                catch (Exception ex)
                {
                    returnInt = -1;
                }

                int catID = Convert.ToInt32(cmd.Parameters["@CatID"].Value.ToString());
            
                cmd = new SqlCommand();

                string weightSub = Weight.Substring(0, 1);
                int weightInt;
                bool isWeight = int.TryParse(weightSub, out weightInt);
                if (!isWeight)
                {
                    Weight = "n/a";
                }


                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "_scan-AddToInventory";
                cmd.Parameters.AddWithValue("@upc", Upc);
                cmd.Parameters.AddWithValue("@categoryID", catID);
                cmd.Parameters.AddWithValue("@weight", Weight);
                cmd.Parameters.AddWithValue("@point", Point);
                cmd.Parameters.AddWithValue("@quantity", Quantity);
                cmd.Parameters.AddWithValue("@user", HttpContext.Current.Session["Access_Net"].ToString());
                cmd.Parameters.AddWithValue("@date", DateTime.Today);

                int ret = objDB.DoUpdateUsingCmdObj(cmd);

                return CheckInventory(Upc);
            }
            catch (Exception ex)
            {
                return "false";
            }


        }

        [WebMethod]
        public static string CheckoutCart(string ItemCount, string PointCount, List<CheckoutItem> itemList)
        {
            Cart cart;
            int cartID;
            DBConnect objDB = new DBConnect(connectionStr);

            try
            {
                JavaScriptSerializer js = new JavaScriptSerializer();

                var items = itemList;

                cart = (Cart)HttpContext.Current.Session["cart"];

                if (items.Count == 0 || cart == null)
                {
                    return "No Items";
                }


                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "CreateReceipt";
                cmd.Parameters.AddWithValue("@personID", HttpContext.Current.Session["PersonID"].ToString());
                cmd.Parameters.AddWithValue("@points", Convert.ToInt32(PointCount));
                cmd.Parameters.AddWithValue("@quantity", Convert.ToInt32(ItemCount));
                cmd.Parameters.AddWithValue("@lastUpdateUser", HttpContext.Current.Session["Access_Net"].ToString());
                cmd.Parameters.AddWithValue("@lastUpdateDate", DateTime.Now);
                cmd.Parameters.AddWithValue("@checkoutDate", DateTime.Now);
                cmd.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;

                objDB.DoUpdateUsingCmdObj(cmd);

                cart.CartID = Convert.ToInt32(cmd.Parameters["@id"].Value.ToString());
                cartID = cart.CartID;

                foreach (CheckoutItem item in items)
                {

                    cmd = new SqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "UpdateItemCheckedOut";
                    cmd.Parameters.AddWithValue("@CategoryID", item.CategoryID);
                    cmd.Parameters.AddWithValue("@Quantity", item.Quantity);
                    cmd.Parameters.AddWithValue("@ReceiptID", cart.CartID);
                    cmd.Parameters.AddWithValue("@lastUpdateUser", HttpContext.Current.Session["Access_Net"].ToString());
                    cmd.Parameters.AddWithValue("@lastUpdateDate", DateTime.Now);

                    objDB.DoUpdateUsingCmdObj(cmd);


                }

                cart = new Cart();
                HttpContext.Current.Session["cart"] = cart;

                return cartID.ToString();
            }
            catch (Exception ex)
            {
                cart = new Cart();
                HttpContext.Current.Session["cart"] = cart;
                return "error";
            }
        }

      private static int addToCart(Item item)
        {
            Cart cart;

            try
            {
                cart = (Cart)HttpContext.Current.Session["cart"];


                cart.Items.Add(item);

                cart.Points = cart.Points + item.Point;


                HttpContext.Current.Session["cart"] = cart;
            }
            catch (Exception ex)
            {
                cart = new Cart();
                cart.Items.Add(item);
                cart.Points = cart.Points + item.Point;

                HttpContext.Current.Session["cart"] = cart;
            }

            return cart.Points;
        }



        private static int getMaxPoint()
        {
            string point = "";
            int pointOut;
            try
            {
                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetMaxPoint";

                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);
                if (ds.Tables[0].Rows.Count != 0)
                {
                    point = ds.Tables[0].Rows[0]["MaxPoint"].ToString();
                }

                bool valid = int.TryParse(point, out pointOut);

                if (valid)
                {
                    return pointOut;
                }
                else
                {
                    throw new FormatException();
                }
            }
            catch (Exception ex)
            {
                return 10;
            }
        }



    }
}