using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace FoodPantry
{
    public class Cart
    {
        private int cartID;
        private ArrayList items = new ArrayList();
        private int points;

        public int CartID { get => cartID; set => cartID = value; }
        public ArrayList Items { get => items; set => items = value; }
        public int Points { get => points; set => points = value; }

        public Cart()
        {
            this.points = 0;
        }
    }
}
