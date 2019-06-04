using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoodPantry
{
    public class CheckoutItem
    {
        private string uPC;
        private string quantity;
        private string categoryID;

        public CheckoutItem()
        {

        }

        public string UPC { get => uPC; set => uPC = value; }
        public string Quantity { get => quantity; set => quantity = value; }
        public string CategoryID { get => categoryID; set => categoryID = value; }
    }
}