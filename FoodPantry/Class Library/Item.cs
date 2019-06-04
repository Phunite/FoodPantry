using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodPantry
{
    public class Item
    {
        private string upc;
        private string category;
        private string weight;
        private int point;
        private int qoh;
        private string image;
        private string flag;
        private int quantity;
        private string packaging;
        private int categoryID;

        public Item(string upc, string category, int point)
        {
            this.Upc = upc;
            this.Category = category;
            this.Point = point;

            this.Weight = weight;
            this.QOH = 0;
            this.Image = "";
        }

        public Item()
        {

        }

        public string Upc { get => upc; set => upc = value; }
        public string Category { get => category; set => category = value; }
        public string Weight { get => weight; set => weight = value; }
        public int Point { get => point; set => point = value; }
        public int QOH { get => qoh; set => qoh = value; }
        public string Image { get => image; set => image = value; }
        public string Flag { get => flag; set => flag = value; }
        public int Quantity { get => quantity; set => quantity = value; }
        public string Packaging { get => packaging; set => packaging = value; }
        public int CategoryID { get => categoryID; set => categoryID = value; }
    }
}
