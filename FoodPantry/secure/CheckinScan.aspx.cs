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
    public partial class CheckinScan : System.Web.UI.Page
    {
        static string connectionStr = ConfigurationManager.ConnectionStrings["appString"].ConnectionString;

        protected void Page_Load(object sender, EventArgs e)
        {
           
                    
        }

        [WebMethod]
        public static string Checkin(string ItemCount, List<CheckoutItem> itemList)
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

                foreach (CheckoutItem item in items)
                {

                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "UpdateItemCheckin";
                    cmd.Parameters.AddWithValue("@CategoryID", item.CategoryID);
                    cmd.Parameters.AddWithValue("@Quantity", Convert.ToInt32(item.Quantity));
                    cmd.Parameters.AddWithValue("@lastUpdateUser", HttpContext.Current.Session["Access_Net"].ToString());
                    cmd.Parameters.AddWithValue("@lastUpdateDate", DateTime.Now);

                    objDB.DoUpdateUsingCmdObj(cmd);


                }

                cart = new Cart();
                HttpContext.Current.Session["cart"] = cart;

                return "added";
            }
            catch (Exception ex)
            {
                cart = new Cart();
                HttpContext.Current.Session["cart"] = cart;
                return "error";
            }
        }

        [WebMethod]
        public static string getCategoryId(string type, string packaging)
        {
            try
            {

                ArrayList ids = new ArrayList();
                DBConnect objDB = new DBConnect(connectionStr);

                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetCategoryId";
                cmd.Parameters.AddWithValue("@type", type);
                cmd.Parameters.AddWithValue("@packaging", packaging);
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                if(ds.Tables[0].Rows.Count == 0)
                {
                    try
                    {
                        cmd = new SqlCommand();
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "AddCategory";
                        cmd.Parameters.AddWithValue("@Type", type);
                        cmd.Parameters.AddWithValue("@Packaging", packaging);
                        cmd.Parameters.AddWithValue("@LastUpdateUser", HttpContext.Current.Session["Access_Net"].ToString());
                        cmd.Parameters.AddWithValue("@LastUpdateDate", DateTime.Now);
                        cmd.Parameters.AddWithValue("@ID", SqlDbType.Int).Direction = ParameterDirection.Output;

                        int status = objDB.DoUpdateUsingCmdObj(cmd);
                        string ID = cmd.Parameters["@ID"].Value.ToString();

                        if (status != -1)
                            ids.Add(ID);
                        else
                            return status.ToString();
                    }
                    catch (Exception ex)
                    {
                        return "Error" + ex.Message;
                    }
                }
                else
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        ids.Add(dr["Id"].ToString());
                    }
                }

               

                JavaScriptSerializer js = new JavaScriptSerializer();
                return js.Serialize(ids[0]);
            }
            catch (Exception ex)
            {
                return "error: " + ex.Message;
            }

        }


        [WebMethod]
        public static string getPackagesList()
        {
            try
            {
                ArrayList packages = new ArrayList();

                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "getPackages";
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    packages.Add(dr[0].ToString());
                }

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                return javaScriptSerializer.Serialize(packages);

            }
            catch (Exception ex)
            {
                ArrayList categories = new ArrayList();
                categories.Add(new Category("1", "Fruit", "Single"));
                categories.Add(new Category("2", "Meat", "Multiple"));

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();

                return javaScriptSerializer.Serialize(categories);
            }
        }


        [WebMethod]
        public static string getCategoryList()
        {
            try
            {
                ArrayList packages = new ArrayList();

                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetCategories";
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    packages.Add(dr["Type"].ToString());
                }

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                return javaScriptSerializer.Serialize(packages);

            }
            catch (Exception ex)
            {
                ArrayList categories = new ArrayList();
                categories.Add(new Category("1", "Fruit", "Single"));
                categories.Add(new Category("2", "Meat", "Multiple"));

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();

                return javaScriptSerializer.Serialize(categories);
            }
        }

       

        private static string CheckInventory(string upc)
        {
            throw new NotImplementedException();
        }
    }
}