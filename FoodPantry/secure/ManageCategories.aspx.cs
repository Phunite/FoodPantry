using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Collections;
using System.Linq;

namespace FoodPantry
{
    public partial class ManageCategories : System.Web.UI.Page
    {

        static string connectionStr = ConfigurationManager.ConnectionStrings["appString"].ConnectionString;

        protected void Page_Load(object sender, EventArgs e)
        {
        //    try
        //    {
        //        if (Session["Authenticated"].ToString() == "True")
        //        {
        //            if (Session["Role"].ToString() != "Admin")
        //            {
        //                Response.Redirect("500http.aspx");
        //            }
        //        }
        //        else
        //        {
        //            Response.Redirect("Default.aspx");
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        Response.Redirect("Default.aspx");
        //    };

        }

        [WebMethod]
        public static string GetCategoryData()
        {

            try
            {
                ArrayList cats = new ArrayList();

                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAllCategories";
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    Category c = new Category();

                    c.Id = dr["Id"].ToString();
                    c.Type = dr["Type"].ToString();
                    c.Packaging = dr["Packaging"].ToString();

                    cats.Add(c);
                }

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                return javaScriptSerializer.Serialize(cats);

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
        public static string AddCategory(string Type, string Packaging)
        {
            try
            {
                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "AddCategory";
                cmd.Parameters.AddWithValue("@Type", Type.First().ToString().ToUpper() + Type.Substring(1));
                cmd.Parameters.AddWithValue("@Packaging", Packaging);
                cmd.Parameters.AddWithValue("@LastUpdateUser", HttpContext.Current.Session["Access_Net"].ToString());
                cmd.Parameters.AddWithValue("@LastUpdateDate", DateTime.Now);
                cmd.Parameters.AddWithValue("@ID", SqlDbType.Int).Direction = ParameterDirection.Output;

                int status = objDB.DoUpdateUsingCmdObj(cmd);
                string ID = cmd.Parameters["@ID"].Value.ToString();

                if (status != -1)
                    return ID;
                else
                    return status.ToString();
            }
            catch (Exception ex)
            {
                return "Error" + ex.Message;
            }
        }

        [WebMethod]
        public static string UpdateCategory(string ID, string Type, string Packaging)
        {
            try
            {
                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "UpdateCategory";
                cmd.Parameters.AddWithValue("@Type", Type);
                cmd.Parameters.AddWithValue("@Packaging", Packaging);
                cmd.Parameters.AddWithValue("@ID", ID);
                cmd.Parameters.AddWithValue("@LastUpdateUser", HttpContext.Current.Session["Access_Net"].ToString());
                cmd.Parameters.AddWithValue("@LastUpdateDate", DateTime.Now);

                int ret = objDB.DoUpdateUsingCmdObj(cmd);

                return ID;
            }
            catch (Exception ex)
            {
                return "Error" + ex.Message;
            }
        }

        [WebMethod]
        public static string RemoveCategory(string Id)
        {
            try
            {
                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[RemoveCategory]";
                cmd.Parameters.AddWithValue("@ID", Id);

                int ret = objDB.DoUpdateUsingCmdObj(cmd);

                return Id;
            }
            catch (Exception ex)
            {
                return "Error" + ex.Message;
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
    }
}