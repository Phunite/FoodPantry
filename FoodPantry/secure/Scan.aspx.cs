using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace FoodPantry
{
    public partial class Scan : System.Web.UI.Page
    {

        
        protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext.Current.Session.Abandon();
        }

        [WebMethod]
        public static string CheckInventory(string upc)
        {
            Boolean local = true;


            ////*****For testing without Database connection***//
            //if (upc == "43100071129")
            //{
            //    item.Upc = upc;
            //    item.Category = "Notebook";
            //    item.Weight = 12.0;
            //    item.Point = 3;
            //    item.QOH = 100;
            //    item.Image = "";
            //}
            //else if (upc == "086216118456")
            //{
            //    item.Upc = upc;
            //    item.Category = "Pencil";
            //    item.Weight = 2.0;
            //    item.Point = 1;
            //    item.QOH = 100;
            //    item.Image = "";

            //}
            //else if (upc == "819913012471")
            //{
            //    item.Upc = upc;
            //    item.Category = "Box";
            //    item.Weight = 3.0;
            //    item.Point = 5;
            //    item.QOH = 100;
            //    item.Image = "";

            //}
            //else
            //{
            //    item.Upc = upc;
            //    item.Category = "Item Not Found";
            //    item.Weight = 0;
            //    item.Point = 0;
            //    item.QOH = 0;
            //    item.Image = "";
            //}

            //cartPoints = addToCart(item);

            //if (cartPoints > MAX_POINTS)
            //{
            //    item.Flag = "true";
            //}

            //return javaScriptSerializer.Serialize(item);

            //************************************************//
            Item item = new Item();
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            DataSet ds;

            int MAX_POINTS = getMaxPoint();
            int cartPoints;

            try
            {
                if (local)
                {
                    DBConnect objDB = new DBConnect(@"Server=localhost\SQLEXPRESS;Database=CherryPantry;Trusted_Connection=True;");
                    string query = "SELECT * FROM Items WHERE[UPC] LIKE '" + upc + "';";
                    ds = objDB.GetDataSet(query);
                }
                else
                {
                    DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "_scan-GetItemByUPC";
                    cmd.Parameters.AddWithValue("@UPC", upc);
                    ds = objDB.GetDataSetUsingCmdObj(cmd);

                }

                //Item Found
                if (ds.Tables[0].Rows.Count != 0)
                {
                    item.Upc = ds.Tables[0].Rows[0]["UPC"].ToString();
                    item.Category = ds.Tables[0].Rows[0]["Type"].ToString();
                    item.Weight = ds.Tables[0].Rows[0]["Weight"].ToString();
                    item.Point = Convert.ToInt32(ds.Tables[0].Rows[0]["Point"]);
                    item.QOH = Convert.ToInt32(ds.Tables[0].Rows[0]["Quantity"]);
                    item.Image = ds.Tables[0].Rows[0]["Image"].ToString();

                }
                //Item Not Found
                else
                {
                    item = new Item(upc, "Item Not Found", 0);
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
                item = new Item(upc, "Item Not Found", 0);
                return javaScriptSerializer.Serialize(item);
            }
        }

        [WebMethod]
        public static string AddToInventory(string Upc, string Category, double Weight, int Point)
        {
            try
            {
                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);

                //TODO: create stored procedure for adding to inventory.
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "AddToInventory";
                cmd.Parameters.AddWithValue("@upc", Upc);
                cmd.Parameters.AddWithValue("@category", Category);
                cmd.Parameters.AddWithValue("@weight", Weight);
                cmd.Parameters.AddWithValue("@point", Point);
                cmd.Parameters.AddWithValue("@quantity", -1);
                cmd.Parameters.AddWithValue("@user", "test");
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
        public static string checkout(string status)
        {
            Cart cart;
            int cartID;
            DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);

            try
            {
                cart = (Cart)HttpContext.Current.Session["cart"];

                if (cart.Items.Count == 0 || cart == null)
                {
                    return "No Items";
                }

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "CreateReceipt";
                cmd.Parameters.AddWithValue("@personID", 0);
                cmd.Parameters.AddWithValue("@points", cart.Points);
                cmd.Parameters.AddWithValue("@quantity", cart.Items.Count);
                cmd.Parameters.AddWithValue("@lastUpdateUser", "eshoshan-test");
                cmd.Parameters.AddWithValue("@lastUpdateDate", DateTime.Now.ToString("MM/dd/yyyy hh:mm tt"));
                cmd.Parameters.AddWithValue("@checkoutDate", DateTime.Now.ToString("MM/dd/yyyy hh:mm tt"));
                cmd.Parameters.Add("@id", SqlDbType.Int).Direction = ParameterDirection.Output;

                objDB.DoUpdateUsingCmdObj(cmd);

                cart.CartID = Convert.ToInt32(cmd.Parameters["@id"].Value.ToString());
                cartID = cart.CartID;

                foreach (Item item in cart.Items)
                {
                    cmd = new SqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "UpdateItemCheckedOut";
                    cmd.Parameters.AddWithValue("@UPC", item.Upc);
                    cmd.Parameters.AddWithValue("@ReceiptID", cart.CartID);
                    cmd.Parameters.AddWithValue("@lastUpdateUser", "eshoshan-test");
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

        [WebMethod]
        public static string RemoveItem(string upc)
        {
            Cart cart;
            Item itemRemoved = new Item();
            try
            {
                cart = (Cart)HttpContext.Current.Session["cart"];

                foreach (Item item in cart.Items)
                {
                    if (item.Upc == upc)
                    {
                        itemRemoved = item;
                        cart.Items.Remove(item);
                        cart.Points -= item.Point;
                        break;
                    }
                }

                HttpContext.Current.Session["cart"] = cart;
                return "Removed: " + itemRemoved.Upc + " -- " + itemRemoved.Category;
            }
            catch (Exception ex)
            {
                cart = new Cart();
                HttpContext.Current.Session["cart"] = cart;
                return "Error";
            }
        }

        [WebMethod]
        public static string ClearCart()
        {
            Cart cart = new Cart();
            HttpContext.Current.Session["cart"] = cart;
            return "Cart Cleared";
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
                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetMaxPoint";

                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);
                if (ds.Tables[0].Rows.Count != 0)
                {
                    point = ds.Tables[0].Rows[0]["MaxPoint"].ToString();
                }

                bool valid = int.TryParse(point,out pointOut);

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


        protected void btnCheckout_Click(object sender, EventArgs e)
        {
            //Cart cart = (Cart)HttpContext.Current.Session["cart"];
            return;
        }
    }
}