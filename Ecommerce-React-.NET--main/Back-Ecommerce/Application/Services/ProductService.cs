using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IMainRepository _mainRepository;
        public ProductService(IMainRepository mainRepository)
        {
            _mainRepository = mainRepository;
        }
        public List<Product> GetProducts()
        {
            return _mainRepository.GetProducts();
        }

        public List<Product> GetProductsDisponible()
        {
            return _mainRepository.GetProductsDisponible();
        }

        public Product GetProductById(int id)
        {
            return _mainRepository.GetProductById(id);
        }
        public Product GetProductByName(string name)
        {
            return _mainRepository.GetProductByName(name);
        }

        public Product CreateProduct(ProductDto product)
        {
            var productCreate = new Product()
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                Image = product.Image,
                Category = product.Category,
                Brand = product.Brand,
                Avaible = true
            };
            _mainRepository.CreateProduct(productCreate);
            return _mainRepository.GetProductById(productCreate.Id);
        }

        public void UpdateProduct(int id, ProductDto product)
        {
            var productUpdate = _mainRepository.GetProductById(id);
            productUpdate.Name = product.Name;
            productUpdate.Description = product.Description;
            productUpdate.Stock = product.Stock;
            productUpdate.Price = product.Price;
            productUpdate.Image = product.Image;
            productUpdate.Category = product.Category;
            productUpdate.Brand = product.Brand;
            _mainRepository.UpdateProduct(productUpdate);
        }

        public void UpdateProductDisponibleBaja(int id)
        {
            var productUpdate = _mainRepository.GetProductById(id);
            productUpdate.Avaible = false;
            _mainRepository.UpdateProduct(productUpdate);
        }

        public void UpdateProductDisponibleAlta(int id)
        {
            var productUpdate = _mainRepository.GetProductById(id);
            productUpdate.Avaible = true;
            _mainRepository.UpdateProduct(productUpdate);
        }

        public void DeleteProduct(int id)
        {
            var productDelete = _mainRepository.GetProductById(id);
            _mainRepository.DeleteProduct(productDelete);
        }
    }
}
