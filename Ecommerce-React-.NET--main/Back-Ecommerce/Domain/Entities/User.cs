using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enums;

namespace Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string? Adress { get; set; }
        public List<Order>? Orders { get; set; }

        public ICollection<Product>? Products { get; set; } = new List<Product>();
        public UserType UserType { get; set; }

        public bool IsActive { get; set; }
        public User(int id, string name, string lastName, string password, string email, string userName, string? adress, List<Order>? orders, ICollection<Product>? products, UserType userType) 
        {
            Id = id;
            Name = name;
            LastName = lastName;
            Password = password;
            Email = email;
            UserName = userName;
            Adress = adress;
            Orders = orders;
            Products = products;
            UserType = userType;
        }
        public User() { }
    }
}
