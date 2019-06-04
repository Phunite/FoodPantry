using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Collections;

namespace FoodPantry
{
    public partial class Points : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //try
            //{
            //    if (Session["Authenticated"].ToString() == "True")
            //    {
            //        if (Session["Role"].ToString() != "Admin")
            //        {
            //            Response.Redirect("500http.aspx");
            //        }
            //    }
            //    else
            //    {
            //        Response.Redirect("Default.aspx");
            //    }

            //}
            //catch (Exception ex)
            //{
            //    Response.Redirect("Default.aspx");
            //};
        }

        [WebMethod]
        public static string setMaxPoint(string point)
        {
            try
            {
                int pointVal = Convert.ToInt32(point);
                if(pointVal > 0)
                {
                    DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                    SqlCommand cmd = new SqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "SetMaxPoint";
                    cmd.Parameters.AddWithValue("@point", pointVal);
                    cmd.Parameters.AddWithValue("@lastUpdateUser", HttpContext.Current.Session["Access_Net"].ToString());
                    cmd.Parameters.AddWithValue("@lastUpdateDate", DateTime.Now.ToString());

                    int ret = objDB.DoUpdateUsingCmdObj(cmd);

                    return pointVal.ToString();
                }
                else
                {
                    throw new FormatException();
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [WebMethod]
        public static string getMaxPoint()
        {
            string point = "";
            try
            {
                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetMaxPoint";

                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);
                if(ds.Tables[0].Rows.Count != 0)
                {
                    point = ds.Tables[0].Rows[0]["MaxPoint"].ToString();
                }
                return point;
            }
            catch (Exception ex)
            {
                return "Error" + ex.Message;
            }
        }
    }
}