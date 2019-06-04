using FoodPantry;
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
    public partial class DonationHistory : System.Web.UI.Page
    {
        static string connectionStr = ConfigurationManager.ConnectionStrings["appString"].ConnectionString;
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }
        [WebMethod]
        public static string GetDonationInfo()
        {
            try
            {
                string status = "Active";
                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand objCommand = new SqlCommand();
                ArrayList Donations = new ArrayList();

                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.CommandText = "GetDonationData";     // identify the name of the stored procedure to execute
                objCommand.Parameters.AddWithValue("@Status", status);

                //Execute the stored procedure using the DBConnect object and the SQLCommand object
                DataSet myDS = objDB.GetDataSetUsingCmdObj(objCommand);
                int count = 0;

                foreach (DataRow row in myDS.Tables[0].Rows)
                {
                    count++;
                }
                for (int i = 0; i < count; i++)
                {
                    DonationData donation = new DonationData();
                    donation.DonationID = Convert.ToInt32(objDB.GetField("DonationID", i));
                    donation.DonorID = Convert.ToInt32(objDB.GetField("DonorID", i));
                    donation.DonorOrgs = objDB.GetField("Organization", i).ToString();
                    donation.DonorLN = objDB.GetField("LastName", i).ToString();
                    donation.DonorFN = objDB.GetField("FirstName", i).ToString();
                    donation.DonorEmail = objDB.GetField("Email", i).ToString();
                    donation.DonorType = objDB.GetField("DonorType", i).ToString();
                    donation.DonationType = objDB.GetField("DonationType", i).ToString();
                    DateTime date = DateTime.Parse(objDB.GetField("DonationDate", i).ToString());
                    donation.DonationDate = date.ToShortDateString();
                    donation.DonationDetail = objDB.GetField("DonationDetail", i).ToString();

                    Donations.Add(donation);
                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                string json = js.Serialize(Donations);
                return json;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }


        }
        [WebMethod]
        public static string UpdateDonation(string DonationId, string DonationType, string DonationDate)
        {
            try
            {
               
                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand objCommand = new SqlCommand();

                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.CommandText = "UpdateDonation";     // identify the name of the stored procedure to execute

                objCommand.Parameters.AddWithValue("@DonationID", Convert.ToInt32(DonationId));
                objCommand.Parameters.AddWithValue("@DonationType", DonationType);
                objCommand.Parameters.AddWithValue("@DonationDate", DonationDate);
                objCommand.Parameters.AddWithValue("@Last_Update_User", HttpContext.Current.Session["Access_Net"].ToString());
                objCommand.Parameters.AddWithValue("@Last_Update_Date", DateTime.Now);


                objDB.DoUpdateUsingCmdObj(objCommand);
                return "true";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [WebMethod]
        public static string UpdateDonor(string DonorID, string DonorFN, string DonorLN, string DonorEmail, string DonorType, string DonorOrgs)
        {
            try
            {
               
                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand objCommand = new SqlCommand();

                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.CommandText = "UpdateDonor";     // identify the name of the stored procedure to execute

                objCommand.Parameters.AddWithValue("@Donorid ", DonorID);
                objCommand.Parameters.AddWithValue("@DonorFN ", DonorFN);
                objCommand.Parameters.AddWithValue("@DonorLN", DonorLN);
                objCommand.Parameters.AddWithValue("@DonorEmail", DonorEmail);
                objCommand.Parameters.AddWithValue("@DonorType", DonorType);
                objCommand.Parameters.AddWithValue("@DonorOrgs", DonorOrgs);
                objCommand.Parameters.AddWithValue("@Last_Update_User", HttpContext.Current.Session["Access_Net"].ToString());
                objCommand.Parameters.AddWithValue("@Last_Update_Date", DateTime.Now);

                objDB.DoUpdateUsingCmdObj(objCommand);
                return "true";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [WebMethod]
        public static string DeleteDonation(string DonationID)
        {
            try
            {
              
                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand objCommand = new SqlCommand();
                string status = "Inactive";

                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.CommandText = "DeleteDonation";     // identify the name of the stored procedure to execute


                objCommand.Parameters.AddWithValue("@donationID", DonationID);
                objCommand.Parameters.AddWithValue("@Status", status);


                objDB.DoUpdateUsingCmdObj(objCommand);
                return "true";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [WebMethod]
        public static string DeleteDonor(string DonorID)
        {
            try
            {
                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand objCommand = new SqlCommand();
                string status = "Inactive";

                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.CommandText = "DeleteDonor";     // identify the name of the stored procedure to execute


                objCommand.Parameters.AddWithValue("@DonorID", DonorID);
                objCommand.Parameters.AddWithValue("@Status", status);


                objDB.DoUpdateUsingCmdObj(objCommand);
                return "true";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [WebMethod]
        public static string GetDonationDetail(string DonationID)
        {
            try
            {
                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand objCommand = new SqlCommand();
                ArrayList Ddetails = new ArrayList();
                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.CommandText = "GetDonationDetails";     // identify the name of the stored procedure to execute

                objCommand.Parameters.AddWithValue("@donationID", DonationID);
                DataSet myDS = objDB.GetDataSetUsingCmdObj(objCommand);
                int count = 0;

                foreach (DataRow row in myDS.Tables[0].Rows)
                {
                    count++;
                }
                for (int i = 0; i < count; i++)
                {
                    DonationData donation = new DonationData();


                    donation.DonationDetail = objDB.GetField("DonationDetail", i).ToString();

                    Ddetails.Add(donation);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();

                string json = js.Serialize(Ddetails);
                return json;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [WebMethod]
        public static string UpdateDonationDetails(string DonationDetails, string DonationID)
        {
            try
            {

                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand objCommand = new SqlCommand();
                ArrayList Donation = new ArrayList();

                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.CommandText = "UpdateDonationDetail";     // identify the name of the stored procedure to execute

                objCommand.Parameters.AddWithValue("@DonationID", Convert.ToInt32(DonationID));
                objCommand.Parameters.AddWithValue("@DonationDetails", DonationDetails);
                objCommand.Parameters.AddWithValue("@Last_Update_User", HttpContext.Current.Session["Access_Net"].ToString());
                objCommand.Parameters.AddWithValue("@Last_Update_Date", DateTime.Now);


                objDB.DoUpdateUsingCmdObj(objCommand);
                return "true";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [WebMethod]
        public static string GetDonorType()
        {
            try
            {
                ArrayList DonorType = new ArrayList();

                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetDonorType";
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    DonorType.Add(dr["DonorType"].ToString());
                }

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                return javaScriptSerializer.Serialize(DonorType);

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [WebMethod]
        public static string GetDonationType()
        {
            
            try
            {
                ArrayList DonaType = new ArrayList();

                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "GetDonationType";
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    DonaType.Add(dr["DonationType"].ToString());
                }

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                return javaScriptSerializer.Serialize(DonaType);

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}