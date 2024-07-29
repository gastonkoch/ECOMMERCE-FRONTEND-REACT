using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models
{
    public class OrderDto
    {
        public int Id { get; set; }
        //public User User { get; set; }

        public int UserId { get; set; }
        //public List<Product>? Products { get; set; }

        public List<int>? ProductsId { get; set; }
    }
}
