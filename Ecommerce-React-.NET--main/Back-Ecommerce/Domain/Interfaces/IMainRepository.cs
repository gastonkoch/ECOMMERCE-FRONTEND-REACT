using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IMainRepository
    {
        public List<Product> GetProducts();
        public List<Product> GetProductsDisponible();
        public Product GetProductById(int id);
        public Product GetProductByName(string name);
        public Product CreateProduct(Product product);
        public void UpdateProduct(Product product);
        public void DeleteProduct(Product product);
        public List<User> GetUsers();
        public User GetUserById(int id);
        public User GetUserByEmail(string email);
        public List<User> GetUsersByName(string name);
        public List<User> GetUserByType(UserType type);
        public User CreateUser(User user);
        public void UpdateUser(User user);
        public void DeleteUser(User user);
        public void ActiveUser(int id);
        public bool ValidateUserCredentials(string userEmail, string userPassword);
        public bool ValidateUserNickName(string userNickName);
        public bool ValidateUserMail(string userMail);
        public List<Order> GetOrders();
        public Order CreateOrder(Order order);
        public Order GetOrderById(int id);
    }
}
