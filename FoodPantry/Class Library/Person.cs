using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodPantry
{
   public class Person
    {
        private int personID;
        private string firstName;
        private string lastName;
        private string accessNet;
        private string status;
        private string role;

        public Person(int personID, string firstName, string lastName, string accessNet, string role, string status)
        {
            this.PersonID =personID ;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.AccessNet = accessNet;
            this.Role = role;
            this.Status = status;
           
         
        }    
        public Person()
        {

        }
        public int PersonID { get => personID; set => personID = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string AccessNet { get => accessNet; set => accessNet = value; }
        public string Status { get => status; set => status = value; }
        public string Role { get => role; set => role = value; }
    }
}
