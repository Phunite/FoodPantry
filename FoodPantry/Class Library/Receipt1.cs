using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodPantry
{
   public class Receipt1
    {
        // Need to add Person Object, for last update user and person ID. 
        public string receiptID;
        public int totalpoints;
        public int quantity;
        public string checkoutdate;
        public string lastupdatedate;
        public string lastupdateuser;
        public int personID;
        public string firstname;
        public string lastname;
        public Receipt1(string receiptID, int personID, int totalpoints, int quantity,string checkoutdate, string lastupdatedate, string lastupdateuser,
            string firstname, string lastname)
        {
            this.PersonID = personID;
            this.ReceiptID = receiptID;
            this.LastUpdateUser = lastupdateuser;
            this.TotalPoints = totalpoints;
            this.CheckoutDate = checkoutdate;
            this.TotalQuantity = quantity;
            this.LastUpdateDate = lastupdatedate;
            this.FirstName = firstname;


        }
        public Receipt1() { }
        public int PersonID { get => personID; set => personID = value; }
        public string FirstName{ get => firstname; set => firstname = value; }
        public string LastName { get => lastname; set => lastname = value; }
        public string ReceiptID { get => receiptID; set => receiptID = value; }
        public int TotalPoints { get => totalpoints; set => totalpoints = value; }
        public int TotalQuantity { get => quantity; set => quantity = value; }
        public string LastUpdateUser { get => lastupdateuser; set => lastupdateuser = value; }
        public string LastUpdateDate { get => lastupdatedate; set => lastupdatedate = value; }
        public string CheckoutDate { get => checkoutdate; set => checkoutdate = value; }
    }
}
