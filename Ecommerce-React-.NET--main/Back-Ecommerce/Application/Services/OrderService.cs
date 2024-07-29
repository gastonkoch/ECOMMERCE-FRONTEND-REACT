using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMainRepository _mainRepository;
        public OrderService(IMainRepository mainRepository)
        {
            _mainRepository = mainRepository;
        }

        public Order GetOrderById(int id)
        {
            return _mainRepository.GetOrderById(id);
        }

        public List<Order> GetOrders()
        {
            return _mainRepository.GetOrders();
        }

        public Order CreateOrder(OrderDto order)
        {
            var user = _mainRepository.GetUserById(order.UserId);

            List<Product> products = new List<Product>();

            foreach (var product in order.ProductsId)
            {
                products.Add(_mainRepository.GetProductById(product));
            }

            var orderCrear = new Order()
            {
                User = user,
                Products = products
            };

            _mainRepository.CreateOrder(orderCrear);

            return _mainRepository.GetOrderById(orderCrear.Id);
        }
    }
}
