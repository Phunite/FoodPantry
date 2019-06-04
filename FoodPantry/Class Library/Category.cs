using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoodPantry
{
    public class Category
    {
        private string id;
        private string type;
        private string packaging;

        public Category(string id, string type, string packaging)
        {
            this.id = id;
            this.type = type;
            this.packaging = packaging;
        }

        public Category()
        {

        }

        public string Id { get => id; set => id = value; }
        public string Type { get => type; set => type = value; }
        public string Packaging { get => packaging; set => packaging = value; }
    }
}
