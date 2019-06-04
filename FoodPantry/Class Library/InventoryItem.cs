using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoodPantry
{
    public class InventoryItem
    {
        private string id;
        private string category;
        private string packaging;



        public InventoryItem()
        {

        }

        public string Id { get => id; set => id = value; }
        public string Category { get => category; set => category = value; }
        public string Packaging { get => packaging; set => packaging = value; }
    }
}