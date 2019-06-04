using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodPantry
{
    public class ItemDATA
    {
        // SELECT UPC, Category, Weight, Point, Quantity From Items--%>
        public string Image { get; set; }
        public string UPC { get; set; }
        public string Category { get; set; }
        public string Weight { get; set; }
        public string Point { get; set; }
        public string Quantity { get; set; }
    }
}
