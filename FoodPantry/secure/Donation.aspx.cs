using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Serialization;
using System.Collections;
using System.Web.Services;

namespace FoodPantry
{
    public partial class Donation : System.Web.UI.Page
    {
        static string connectionStr = ConfigurationManager.ConnectionStrings["appString"].ConnectionString;


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
            ////txtTodaysDate.Text = DateTime.Now.ToShortDateString();

        }

        [WebMethod]
        public static string GetReturningDonors()
        {
            try
            {
                ArrayList donors = new ArrayList();

                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "_donation-GetDonorList";
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    Donor newDonor = new Donor();
                    newDonor.DonorID = Convert.ToInt32(dr["DonorID"]);
                    newDonor.DonorType = dr["DonorType"].ToString();
                    newDonor.FirstName = dr["FirstName"].ToString();
                    newDonor.LastName = dr["LastName"].ToString();
                    newDonor.Affiliation = dr["TempleAffiliation"].ToString();
                    newDonor.Organization = dr["Organization"].ToString();
                    newDonor.TuId = dr["TUID"].ToString();
                    newDonor.Email = dr["Email"].ToString();
                    newDonor.Status = dr["Status"].ToString();
                    newDonor.SavedDonor = dr["SavedDonor"].ToString();
                    donors.Add(newDonor);


                }

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                return javaScriptSerializer.Serialize(donors);
            }
            catch (Exception ex)
            {
                return "false";
            }


        }

        [WebMethod]
        public static string RemoveSavedDonor(string savedDonor)
        {
            try
            {
                DBConnect objDB = new DBConnect(connectionStr);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "removeSavedDonor";
                cmd.Parameters.AddWithValue("@savedDonor", savedDonor);

                int ret = objDB.DoUpdateUsingCmdObj(cmd);

                return "true";
            }
            catch (Exception ex)
            {
                return "false";
            }

        }

        [WebMethod]
        public static string SubmitDonor(string firstName, string lastName, string donorType, string donationType, string email, string organization, string templeAffiliation, string tuID, string donationDetail, string savedDonor, string existingDonor)
        {

            try
            {
                if (existingDonor == "-1")
                {

                    DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                    DateTime lastUpdateDate = DateTime.Now;
                    string LastUpdateUser = HttpContext.Current.Session["Access_Net"].ToString();
                    string status = "Active";
                    string personID = HttpContext.Current.Session["PersonID"].ToString();


                    if (savedDonor != "" && savedDonor != null)
                    {
                        SqlCommand cmd = new SqlCommand();
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = "_donation-CheckSavedName";
                        cmd.Parameters.AddWithValue("@name", savedDonor);

                        DataSet ds2 = objDB.GetDataSetUsingCmdObj(cmd);
                        if (ds2.Tables[0].Rows.Count > 0)
                        {
                            //ClientScript.RegisterStartupScript(this.GetType(), "confirmation", "alertconfirmationError('Saved Donor Name already exists.')", true);
                            return "Donor Name Exists";
                        }
                    }
                    else
                    {
                        savedDonor = "";
                    }

                    SqlCommand objCommand = new SqlCommand();
                    objCommand.CommandType = CommandType.StoredProcedure;
                    objCommand.CommandText = "AddDonor";
                    objCommand.Parameters.AddWithValue("@DonorID", SqlDbType.Int).Direction = ParameterDirection.Output;
                    objCommand.Parameters.AddWithValue("@DonorType", donorType);
                    objCommand.Parameters.AddWithValue("@FirstName", firstName);
                    objCommand.Parameters.AddWithValue("@LastName", lastName);
                    objCommand.Parameters.AddWithValue("@TempleAffiliation", templeAffiliation);
                    objCommand.Parameters.AddWithValue("@Organization", organization);
                    objCommand.Parameters.AddWithValue("@TUID", tuID);
                    objCommand.Parameters.AddWithValue("@Email", email);
                    objCommand.Parameters.AddWithValue("@LastUpdateDate", lastUpdateDate);
                    objCommand.Parameters.AddWithValue("@LastUpdateUser", LastUpdateUser);
                    objCommand.Parameters.AddWithValue("@Status", status);
                    objCommand.Parameters.AddWithValue("@SavedDonor", savedDonor);


                    objDB.DoUpdateUsingCmdObj(objCommand);
                    string donorID = objCommand.Parameters["@DonorID"].Value.ToString();

                    objCommand.Parameters.Clear();
                    objCommand.CommandType = CommandType.StoredProcedure;
                    objCommand.CommandText = "AddDonation";
                    objCommand.Parameters.AddWithValue("@DonationID", SqlDbType.Int).Direction = ParameterDirection.Output;
                    objCommand.Parameters.AddWithValue("@PersonID", personID);
                    objCommand.Parameters.AddWithValue("@DonorID", donorID);
                    objCommand.Parameters.AddWithValue("@DonationType", donationType);
                    objCommand.Parameters.AddWithValue("@DonationDate", lastUpdateDate);
                    objCommand.Parameters.AddWithValue("@DonationDetail", donationDetail);
                    objCommand.Parameters.AddWithValue("@LastUpdateDate", lastUpdateDate);
                    objCommand.Parameters.AddWithValue("@LastUpdateUser", LastUpdateUser);
                    objCommand.Parameters.AddWithValue("@Status", status);

                    int ret = objDB.DoUpdateUsingCmdObj(objCommand);


                    //ClientScript.RegisterStartupScript(this.GetType(), "confirmation", "alertconfirmation()", true);
                    return "true";
                }
                else
                {
                    string theDonorID = existingDonor;
                    DateTime lastUpdateDate = DateTime.Now;
                    string LastUpdateUser = HttpContext.Current.Session["Access_Net"].ToString();
                    string personID = HttpContext.Current.Session["PersonID"].ToString();
                    string status = "Active";

                    DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                    SqlCommand objCommand = new SqlCommand();
                    objCommand.Parameters.Clear();
                    objCommand.CommandType = CommandType.StoredProcedure;
                    objCommand.CommandText = "AddDonation";
                    objCommand.Parameters.AddWithValue("@DonationID", SqlDbType.Int).Direction = ParameterDirection.Output;
                    objCommand.Parameters.AddWithValue("@PersonID", personID);
                    objCommand.Parameters.AddWithValue("@DonorID", theDonorID);
                    objCommand.Parameters.AddWithValue("@DonationType", donationType);
                    objCommand.Parameters.AddWithValue("@DonationDate", lastUpdateDate);
                    objCommand.Parameters.AddWithValue("@DonationDetail", donationDetail);
                    objCommand.Parameters.AddWithValue("@LastUpdateDate", lastUpdateDate);
                    objCommand.Parameters.AddWithValue("@LastUpdateUser", LastUpdateUser);
                    objCommand.Parameters.AddWithValue("@Status", status);
                    DataSet ds = objDB.GetDataSetUsingCmdObj(objCommand);

                    return "true";
                    //ClientScript.RegisterStartupScript(this.GetType(), "confirmation", "alertconfirmation()", true);

                }
            }
            catch (Exception ex)
            {
                return "error";
                //ClientScript.RegisterStartupScript(this.GetType(), "confirmation", "alertconfirmationError()", true);

            }

        }
        protected void btnSubmitDonor_Click(object sender, EventArgs e)
        {

        }

    }
}

