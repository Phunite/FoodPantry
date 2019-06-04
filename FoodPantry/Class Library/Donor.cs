using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoodPantry
{
    public class Donor
    {
        public Donor()
        {

        }


        private int donorID;
        private string donorType;
        private string firstName;
        private string lastName;
        private string affiliation;
        private string organization;
        private string tuId;
        private string email;
        private string status;
        private string savedDonor;

        public int DonorID { get => donorID; set => donorID = value; }
        public string DonorType { get => donorType; set => donorType = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Affiliation { get => affiliation; set => affiliation = value; }
        public string Organization { get => organization; set => organization = value; }
        public string TuId { get => tuId; set => tuId = value; }
        public string Email { get => email; set => email = value; }
        public string Status { get => status; set => status = value; }
        public string SavedDonor { get => savedDonor; set => savedDonor = value; }
    }
}