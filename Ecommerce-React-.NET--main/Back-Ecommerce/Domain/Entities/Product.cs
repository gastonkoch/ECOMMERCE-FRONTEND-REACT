using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Stock { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public string Brand { get; set; }

        public bool Avaible { get; set; } = true;

        public Product(int id, string name, string description, float price, int stock, string image, string category, string brand, bool avaible)
        {
            Id = id;
            Name = name;
            Description = description;
            Price = price;
            Stock = stock;
            Image = image;
            Category = category;
            Brand = brand;
            Avaible = avaible;
        }

        public Product() { }
    }
}
