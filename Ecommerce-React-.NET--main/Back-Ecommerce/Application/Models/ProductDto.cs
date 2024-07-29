using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class ProductDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Stock { get; set; }
        public string Image {  get; set; }
        public string Category { get; set; }
        public string Brand { get; set; }
        public bool Avaible { get; set; }
    }
}
