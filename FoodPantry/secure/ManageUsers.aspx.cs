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
    public partial class ManageUsers : System.Web.UI.Page
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
        public static string GetUserData()
        {
            try
            {
                ArrayList users = new ArrayList();

                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetAllPerson";
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    Person p = new Person();

                    p.PersonID = Convert.ToInt32(dr["PersonID"]);
                    p.FirstName = dr["FirstName"].ToString();
                    p.LastName = dr["LastName"].ToString();
                    p.AccessNet = dr["AccessnetID"].ToString();
                    p.Role = dr["RoleID"].ToString();
                    p.Status = dr["Status"].ToString();

                    switch (dr["RoleID"].ToString())
                    {
                        case "1":
                            p.Role = "Admin";
                            break;
                        case "2":
                            p.Role = "Volunteer";
                            break;
                        case "3":
                            p.Role = "Student Worker";
                            break;
                    }

                    users.Add(p);
                }

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                return javaScriptSerializer.Serialize(users);

            }
            catch (Exception ex)
            {
                ArrayList users = new ArrayList();

                Person evan = new Person(0, "Evan", "Shoshan", "tuf92127", "Admin", "Active");
                Person abe = new Person(0, "Abe", "Cho", "tuf85652", "Admin", "Active");

                users.Add(evan);
                users.Add(abe);

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();

                return javaScriptSerializer.Serialize(users);
            }




        }

        [WebMethod]
        public static string AddUser(string Role, string FirstName, string LastName, string AccessNet, string Status)
        {
            int RoleID = 0;

            switch (Role)
            {
                case "Admin":
                    RoleID = 1;
                    break;
                case "Volunteer":
                    RoleID = 2;
                    break;
                case "Student Worker":
                    RoleID = 3;
                    break;
            }
            try
            {
                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "AddPerson";
                cmd.Parameters.AddWithValue("@FirstName", FirstName);
                cmd.Parameters.AddWithValue("@LastName", LastName);
                cmd.Parameters.AddWithValue("@AccessNet", AccessNet);
                cmd.Parameters.AddWithValue("@Status", Status);
                cmd.Parameters.AddWithValue("@RoleID", RoleID);
                cmd.Parameters.AddWithValue("@CreationTime", DateTime.Now.ToShortTimeString());
                cmd.Parameters.AddWithValue("@LastUpdateUser", HttpContext.Current.Session["Access_Net"].ToString());
                cmd.Parameters.AddWithValue("@LastUpdateDate", DateTime.Now.ToShortDateString());
                cmd.Parameters.AddWithValue("@PersonID", SqlDbType.Int).Direction = ParameterDirection.Output;

                objDB.DoUpdateUsingCmdObj(cmd);
                string personID = cmd.Parameters["@PersonID"].Value.ToString();
                return personID;
            }
            catch (Exception ex)
            {
                return "Error" + ex.Message;
            }

        }

        [WebMethod]
        public static string UpdateUser(int PersonID, string FirstName, string LastName, string AccessNet, string Role, string Status)
        {
            int RoleID = 0;

            switch (Role)
            {
                case "Admin":
                    RoleID = 1;
                    break;
                case "Volunteer":
                    RoleID = 2;
                    break;
                case "Student Worker":
                    RoleID = 3;
                    break;
            }
            try
            {
                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "UpdatePerson";
                cmd.Parameters.AddWithValue("@PersonID", PersonID);
                cmd.Parameters.AddWithValue("@FirstName", FirstName);
                cmd.Parameters.AddWithValue("@LastName", LastName);
                cmd.Parameters.AddWithValue("@AccessNet", AccessNet);
                cmd.Parameters.AddWithValue("@Status", Status);
                cmd.Parameters.AddWithValue("@RoleID", RoleID);
                cmd.Parameters.AddWithValue("@LastUpdateUser", HttpContext.Current.Session["Access_Net"].ToString());
                cmd.Parameters.AddWithValue("@LastUpdateDate", DateTime.Now.ToShortDateString());

                objDB.DoUpdateUsingCmdObj(cmd);
                return PersonID.ToString();
            }
            catch (Exception ex)
            {
                return "Error" + ex.Message;
            }

        }

        [WebMethod]
        public static string RemoveUser(string personID)
        {
            try
            {
                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "RemoveUser";
                cmd.Parameters.AddWithValue("@PersonID", Convert.ToInt32(personID));
                objDB.DoUpdateUsingCmdObj(cmd);
                return personID.ToString();
            }
            catch (Exception ex)
            {
                return "Error" + ex.Message;
            }
        }

    }
}