using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Configuration;

namespace FoodPantry.secure
{
    public partial class Default : System.Web.UI.Page
    {
        string ConnectionString = ConfigurationManager.ConnectionStrings["appString"].ConnectionString;
        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}
