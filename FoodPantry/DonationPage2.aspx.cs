using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Services;
using System.Collections;
using System.Web.Script.Serialization;
using FoodPantry.Class_Library;

namespace FoodPantry
{
    public partial class DonationPage2 : System.Web.UI.Page
    {


        protected void Page_Load(object sender, EventArgs e)
        {
            
            txtTodaysDate.Text = DateTime.Now.ToShortDateString();
            if (!IsPostBack)
            {
                try
                {
                    DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                    SqlCommand objCommand = new SqlCommand();
                    objCommand.CommandType = CommandType.StoredProcedure;
                    objCommand.CommandText = "GetDonors";
                    ddlDonorList.DataSource = objDB.GetDataSetUsingCmdObj(objCommand);
                    ddlDonorList.DataTextField = "FullName";
                    ddlDonorList.DataValueField = "FullName";
                    ddlDonorList.DataBind();
                    ddlDonorList.Items.Insert(0, "Select If Applicable");
                }
                catch (Exception ex)
                {

                }

            }

        }
     
        [WebMethod]
        public static string GetReturningDonors()
        {
          
                ArrayList donors = new ArrayList();

                DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                SqlCommand cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "getDonor";
                DataSet ds = objDB.GetDataSetUsingCmdObj(cmd);

                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    donors.Add(dr[0].ToString());
            }

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                return javaScriptSerializer.Serialize(donors);

        }


        protected void btnSubmitDonor_Click(object sender, EventArgs e)
        {

            if (ddlDonorList.Text == "Select If Applicable")
            {
                try
                {
                    DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                    string donorType = ddlDonorType.Text;
                    string firstName = txtFirst.Text;
                    string lastName = txtLast.Text;
                    string templeAffiliation = ddlTempleAffil.Text;
                    string tuID = txtTUID.Text;
                    string email = txtEmail.Text;
                    string organization = txtDonorOrganization.Text;
                    DateTime lastUpdateDate = DateTime.Now;
                    string LastUpdateUser = "Rachael"; //Needs to be changed once login is implemented
                    int personID = 3; //Needs to be changed once login is implemented
                    string donationType = ddlDonationType.Text;
                    string donationDetail = txtDetail.Text;
                    string status = "Active";

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


                    DataSet myDS = objDB.GetDataSetUsingCmdObj(objCommand);
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
                    DataSet ds = objDB.GetDataSetUsingCmdObj(objCommand);

                    //Response.Write("<script>alert('Your donation has been received.');</script>");

                    ClientScript.RegisterStartupScript(this.GetType(), "confirmation", "alertconfirmation()", true);
                    ddlDonorType.SelectedIndex = 0;
                    txtFirst.Text = "";
                    txtLast.Text = "";
                    ddlTempleAffil.SelectedIndex = 0;
                    txtTUID.Text = "";
                    txtEmail.Text = "";
                    txtDonorOrganization.Text = "";
                    ddlDonationType.SelectedIndex = 0;
                    txtDetail.Text = "";
                    


                }
                catch (Exception)
                {

                    throw;
                }

            }
            else
            {
                try
                {
                    DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
                    SqlCommand objCommand = new SqlCommand();
                    string first = txtFirst.Text;
                    string last = txtLast.Text;
                    string email = txtEmail.Text;

                    objCommand.Parameters.Clear();
                    objCommand.CommandType = CommandType.StoredProcedure;
                    objCommand.CommandText = "FindDonor";

                    SqlParameter inputParameter3 = new SqlParameter("@FirstName", first);
                    inputParameter3.Direction = ParameterDirection.Input;
                    inputParameter3.SqlDbType = SqlDbType.VarChar;
                    objCommand.Parameters.Add(inputParameter3);

                    inputParameter3 = new SqlParameter("@LastName", last);
                    inputParameter3.Direction = ParameterDirection.Input;
                    inputParameter3.SqlDbType = SqlDbType.VarChar;
                    objCommand.Parameters.Add(inputParameter3);

                    inputParameter3 = new SqlParameter("@DonorID", SqlDbType.Int);
                    inputParameter3.Direction = ParameterDirection.Output;
                    objCommand.Parameters.Add(inputParameter3);
                    objDB.GetDataSetUsingCmdObj(objCommand);

                    string id = objCommand.Parameters["@DonorID"].Value.ToString();
                    int theDonorID;


                    theDonorID = int.Parse(id);

                    DateTime lastUpdateDate = DateTime.Now;
                    string LastUpdateUser = "Rachael"; //Needs to be changed once login is implemented
                    int personID = 3; //Needs to be changed once login is implemented
                    string donationType = ddlDonationType.Text;
                    string donationDetail = txtDetail.Text;
                    string status = "Active";

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

                    //Response.Write("<script>alert('Your donation has been received.');</script>");
                    ClientScript.RegisterStartupScript(this.GetType(), "confirmation", "alertconfirmation()", true);

                    ddlDonorType.SelectedIndex = 0;
                    txtFirst.Text = "";
                    txtLast.Text = "";
                    ddlTempleAffil.SelectedIndex = 0;
                    txtTUID.Text = "";
                    txtEmail.Text = "";
                    txtDonorOrganization.Text = "";
                    ddlDonationType.SelectedIndex = 0;
                    txtDetail.Text = "";

                  

                }
                catch (Exception ex)
                {

                    throw;
                }

            }
        }



        protected void ddlDonorList_SelectedIndexChanged1(object sender, EventArgs e)
        {
            if(ddlDonorList.Text == "Select If Applicable")
            {
                
                txtFirst.Text = "";
                txtLast.Text = "";
                txtEmail.Text = "";
                txtDonorOrganization.Text = "";
                ddlDonorType.SelectedIndex = 0;
                ddlTempleAffil.SelectedIndex = 0;
                txtTUID.Text = "";

            } else
            {

           
            string name = ddlDonorList.SelectedValue;
            string[] fullname = name.Split(' ');
            string firstName = fullname[0];
            string lastName = fullname[1];
            //Get Donor ID
            DBConnect objDB = new DBConnect(ConfigurationManager.ConnectionStrings["appString"].ConnectionString);
            SqlCommand objCommand = new SqlCommand();


            objCommand.Parameters.Clear();
            objCommand.CommandType = CommandType.StoredProcedure;
            objCommand.CommandText = "FindDonor";
            SqlParameter inputParameter3 = new SqlParameter("@FirstName", firstName);
            inputParameter3.Direction = ParameterDirection.Input;
            inputParameter3.SqlDbType = SqlDbType.VarChar;
            objCommand.Parameters.Add(inputParameter3);
            inputParameter3 = new SqlParameter("@LastName", lastName);
            inputParameter3.Direction = ParameterDirection.Input;
            inputParameter3.SqlDbType = SqlDbType.VarChar;
            objCommand.Parameters.Add(inputParameter3);
            inputParameter3 = new SqlParameter("@DonorID", SqlDbType.Int);
            inputParameter3.Direction = ParameterDirection.Output;
            objCommand.Parameters.Add(inputParameter3);
            objDB.GetDataSetUsingCmdObj(objCommand);

            string id = objCommand.Parameters["@DonorID"].Value.ToString();
            int theDonorID = int.Parse(id);

            //Get Donor Details
            SqlCommand objCommand1 = new SqlCommand();
            objCommand1.CommandType = CommandType.StoredProcedure;
            objCommand1.CommandText = "GetDonorDetails";
            objCommand1.Parameters.AddWithValue("@donorID", theDonorID);
            DataSet ds = objDB.GetDataSetUsingCmdObj(objCommand1);
            int count = 0;
            foreach (DataRow row in ds.Tables[0].Rows)
            {
                count++;
            }
                if (ds.Tables[0].Rows.Count != 0)
                {
                    for (int i = 0; i < count; i++)
                    {

                        //myItem.Category = objDB.GetField("Category", i).ToString();
                        txtFirst.Text = objDB.GetField("FirstName", i).ToString();
                        txtLast.Text = objDB.GetField("LastName", i).ToString();
                        txtEmail.Text = objDB.GetField("Email", i).ToString();
                        txtTUID.Text = objDB.GetField("TUID", i).ToString();

                        if (objDB.GetField("Organization", i).ToString() != "")
                        {
                            txtDonorOrganization.Text = objDB.GetField("Organization", i).ToString();
                        }
                        else
                        {
                            txtDonorOrganization.Text = "N/A";
                        }
                        if (objDB.GetField("TempleAffiliation", i).ToString() == "Yes")
                        {
                            ddlTempleAffil.SelectedValue = "Yes";
                        }
                        else
                        {
                            ddlTempleAffil.SelectedValue = "No";
                        }
                        if (objDB.GetField("DonorType", i).ToString() == "Individual")
                        {
                            ddlDonorType.SelectedValue = "Individual";
                        }
                        else if (objDB.GetField("DonorType", i).ToString() == "Organization")
                        {
                            ddlDonorType.SelectedValue = "Organization";
                        }
                        else
                        {
                            ddlDonorType.SelectedValue = "Anonymous";
                        }
                    }
                }

            }
        }
    }
}

