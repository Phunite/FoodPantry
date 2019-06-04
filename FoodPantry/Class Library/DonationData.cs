using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoodPantry
{
    public class DonationData
    {
        public int DonationID { get; set; }
        public int DonorID { get; set; }
        public string DonorFN { get; set; }
        public string DonorLN { get; set; }
        public string DonorFullName { get; set; }
        public string DonorEmail { get; set; }
        public string DonorType { get; set; }
        public string DonorOrgs { get; set; }
        public string DonationType { get; set; }
        public string DonationDate { get; set; }
        public string DonationDetail { get; set; }

        public DonationData()
        {

        }
    }
}