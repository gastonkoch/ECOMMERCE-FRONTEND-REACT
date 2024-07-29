using Application.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Infraestructure.Data
{
    public class MainRepository : IMainRepository
    {
        static int LastIdAssignedProduct = 30; //Revisar que el numero sea siempre el ultimo id asignado de la lista
        static List<Product> products = new List<Product>
        {
            new Product { Id = 1, Name = "Mancuernas Ajustables Bowflex", Price = 350, Description = "Mancuernas ajustables con un rango de peso de 5 a 52.5 libras.", Stock = 20, Image = "https://http2.mlstatic.com/D_NQ_NP_907606-MLA75657102021_042024-O.webp", Category = "Pesas", Brand = "Bowflex", Avaible = true },
            new Product { Id = 2, Name = "Esterilla de Yoga Manduka", Price = 80, Description = "Esterilla de yoga de alta densidad con excelente amortiguación.", Stock = 50, Image = "https://http2.mlstatic.com/D_NQ_NP_859098-MLA31351836565_072019-O.webp", Category = "Yoga", Brand = "Manduka", Avaible = true },
            new Product { Id = 3, Name = "Banco de Pesas Ajustable", Price = 150, Description = "Banco de pesas ajustable para diferentes ángulos de entrenamiento.", Stock = 30, Image = "https://http2.mlstatic.com/D_NQ_NP_881788-MLA73125092154_122023-O.webp", Category = "Pesas", Brand = "GymMaster", Avaible = true },
            new Product { Id = 4, Name = "Cuerda para Saltar", Price = 30, Description = "Cuerda para saltar con rodamientos de alta velocidad y cables ajustables.", Stock = 100, Image = "https://http2.mlstatic.com/D_NQ_NP_706901-MLA54857537959_042023-O.webp", Category = "Cardio", Brand = "Velites", Avaible = true },
            new Product { Id = 5, Name = "Rodillo de Espuma TriggerPoint", Price = 35, Description = "Rodillo de espuma para masaje muscular y liberación miofascial.", Stock = 40, Image = "https://http2.mlstatic.com/D_NQ_NP_701019-MLU71712648730_092023-O.webp", Category = "Recuperación", Brand = "TriggerPoint", Avaible = true },
            new Product { Id = 6, Name = "Kettlebell Reebok 16kg", Price = 60, Description = "Kettlebell de 16 kg para entrenamiento de fuerza y resistencia.", Stock = 25, Image = "https://http2.mlstatic.com/D_NQ_NP_862119-MLA54552650639_032023-O.webp", Category = "Pesas", Brand = "Reebok", Avaible = true },
            new Product { Id = 7, Name = "Rueda de Abdominales Perfect Fitness", Price = 25, Description = "Rueda para ejercicios de abdominales con agarres ergonómicos.", Stock = 80, Image = "https://http2.mlstatic.com/D_NQ_NP_603140-MLA31036391879_062019-O.webp", Category = "Core", Brand = "Perfect Fitness", Avaible = true },
            new Product { Id = 8, Name = "Cinta de Correr NordicTrack", Price = 900, Description = "Cinta de correr con inclinación automática y programas de entrenamiento integrados.", Stock = 15, Image = "https://http2.mlstatic.com/D_NQ_NP_912375-MLA76097624901_042024-O.webp", Category = "Cardio", Brand = "NordicTrack", Avaible = true },
            new Product { Id = 9, Name = "Chaleco de Peso Ajustable", Price = 100, Description = "Chaleco de peso ajustable para aumentar la intensidad del entrenamiento.", Stock = 35, Image = "https://http2.mlstatic.com/D_NQ_NP_914115-MLA51394899205_092022-O.webp", Category = "Pesas", Brand = "GymMaster", Avaible = true },
            new Product { Id = 10, Name = "Set de Bandas de Resistencia FitSimplify", Price = 20, Description = "Set de bandas de resistencia de diferentes niveles para ejercicios de fuerza.", Stock = 120, Image = "https://http2.mlstatic.com/D_NQ_NP_984976-MLU71707185036_092023-O.webp", Category = "Accesorios", Brand = "FitSimplify", Avaible = true },
            new Product { Id = 11, Name = "Reloj Deportivo Garmin Forerunner 35", Price = 200, Description = "Reloj deportivo con GPS y monitor de frecuencia cardíaca.", Stock = 50, Image = "https://http2.mlstatic.com/D_NQ_NP_951762-MLA51967035521_102022-O.webp", Category = "Tecnología", Brand = "Garmin", Avaible = true },
            new Product { Id = 12, Name = "Barra de Dominadas Iron Gym", Price = 40, Description = "Barra de dominadas ajustable para puertas sin necesidad de perforaciones.", Stock = 60, Image = "https://http2.mlstatic.com/D_NQ_NP_749330-MLA31076986732_062019-O.webp", Category = "Pesas", Brand = "Iron Gym", Avaible = true },
            new Product { Id = 13, Name = "Rueda de Abdominales Perfect Fitness", Price = 25, Description = "Rueda para ejercicios de abdominales con agarres ergonómicos.", Stock = 80, Image = "https://http2.mlstatic.com/D_NQ_NP_950695-MLA75435735159_032024-O.webp", Category = "Core", Brand = "Perfect Fitness", Avaible = true },
            new Product { Id = 14, Name = "Bicicleta Estática Schwinn IC4", Price = 800, Description = "Bicicleta estática de alta resistencia con conectividad Bluetooth.", Stock = 20, Image = "https://http2.mlstatic.com/D_NQ_NP_813344-MLU72651628993_112023-O.webp", Category = "Cardio", Brand = "Schwinn", Avaible = true },
            new Product { Id = 15, Name = "Guantes de Entrenamiento DRB", Price = 25, Description = "Guantes de entrenamiento con acolchado y ventilación.", Stock = 100, Image = "https://http2.mlstatic.com/D_NQ_NP_930982-MLA76086538479_042024-O.webpg", Category = "Accesorios", Brand = "Nike", Avaible = true },
            new Product { Id = 16, Name = "Balón Medicinal 8kg", Price = 40, Description = "Balón medicinal de 8 kg para entrenamiento funcional.", Stock = 50, Image = "https://http2.mlstatic.com/D_NQ_NP_816906-MLU75550631924_042024-O.webp", Category = "Pesas", Brand = "GymMaster", Avaible = true },
            new Product { Id = 17, Name = "Colchoneta de Ejercicios ProsourceFit", Price = 30, Description = "Colchoneta de ejercicios de 1.5 cm de grosor para mayor confort.", Stock = 70, Image = "https://http2.mlstatic.com/D_NQ_NP_735527-MLU75545292112_042024-O.webp", Category = "Accesorios", Brand = "ProsourceFit", Avaible = true },
            new Product { Id = 18, Name = "Soga de Batalla 12m", Price = 100, Description = "Soga de batalla de 12 metros para entrenamiento de alta intensidad.", Stock = 30, Image = "https://http2.mlstatic.com/D_NQ_NP_647009-MLA53225875152_012023-O.webp", Category = "Pesas", Brand = "GymMaster", Avaible = true },
            new Product { Id = 19, Name = "Stepper Aeróbico Reebok", Price = 60, Description = "Stepper aeróbico ajustable en altura para ejercicios cardiovasculares.", Stock = 50, Image = "https://http2.mlstatic.com/D_NQ_NP_870500-MLU75469728779_032024-O.webp", Category = "Cardio", Brand = "Reebok", Avaible = true },
            new Product { Id = 20, Name = "Reloj Deportivo Polar M430", Price = 150, Description = "Reloj deportivo con GPS y monitor de frecuencia cardíaca.", Stock = 40, Image = "https://http2.mlstatic.com/D_NQ_NP_670401-MLU71613190204_092023-O.webp", Category = "Tecnología", Brand = "Polar", Avaible = true },
            new Product { Id = 21, Name = "Discos de Peso Olímpicos 20kg", Price = 70, Description = "Discos de peso olímpicos de 20 kg recubiertos de goma.", Stock = 40, Image = "https://http2.mlstatic.com/D_NQ_NP_994680-MLA46951685612_082021-O.webp", Category = "Pesas", Brand = "GymMaster", Avaible = true },
            new Product { Id = 22, Name = "Soga de Velocidad", Price = 15, Description = "Comba de velocidad ajustable para ejercicios cardiovasculares.", Stock = 90, Image = "https://http2.mlstatic.com/D_NQ_NP_621909-MLA77094103209_062024-O.webp", Category = "Cardio", Brand = "FitSimplify", Avaible = true },
            new Product { Id = 23, Name = "Set de Pesas Rusas", Price = 150, Description = "Set de pesas rusas de diferentes pesos para entrenamiento de fuerza.", Stock = 25, Image = "https://http2.mlstatic.com/D_NQ_NP_760318-MLA74431559627_022024-O.webp", Category = "Pesas", Brand = "GymMaster", Avaible = true },
            new Product { Id = 24, Name = "Kit de Calistenia", Price = 100, Description = "Kit de calistenia con barras paralelas, anillas y bandas de resistencia.", Stock = 30, Image = "https://http2.mlstatic.com/D_NQ_NP_665720-MLA69686685373_052023-O.webp", Category = "Accesorios", Brand = "CalisthenicsPro", Avaible = true },
            new Product { Id = 25, Name = "Bicicleta de Spinning Peloton", Price = 2000, Description = "Bicicleta de spinning Peloton con pantalla táctil y clases en vivo.", Stock = 10, Image = "https://http2.mlstatic.com/D_NQ_NP_909932-MLA76336563602_052024-O.webp", Category = "Cardio", Brand = "Peloton", Avaible = true },
            new Product { Id = 26, Name = "Pesas Tobilleras Ajustables", Price = 25, Description = "Pesas tobilleras ajustables para agregar resistencia al ejercicio.", Stock = 80, Image = "https://http2.mlstatic.com/D_NQ_NP_817216-MLU75630437532_042024-O.webp", Category = "Accesorios", Brand = "FitSimplify", Avaible = true },
            new Product { Id = 27, Name = "Set de Entrenamiento TRX", Price = 200, Description = "Set de entrenamiento en suspensión TRX para ejercicios de cuerpo completo.", Stock = 40, Image = "https://http2.mlstatic.com/D_NQ_NP_620342-MLU71108121222_082023-O.webp", Category = "Accesorios", Brand = "TRX", Avaible = true },
            new Product { Id = 28, Name = "Chaleco de Hidratación", Price = 50, Description = "Chaleco de hidratación con capacidad para 2 litros de agua.", Stock = 60, Image = "https://http2.mlstatic.com/D_NQ_NP_720314-MLA70693724920_072023-O.webp", Category = "Accesorios", Brand = "HydroVest", Avaible = true },
            new Product { Id = 29, Name = "Masajeador de Percusión Theragun", Price = 400, Description = "Masajeador de percusión para recuperación muscular profunda.", Stock = 20, Image = "https://http2.mlstatic.com/D_NQ_NP_839801-MLA51824143701_102022-O.webp", Category = "Recuperación", Brand = "Theragun", Avaible = true },
            new Product { Id = 30, Name = "Zapatillas de Correr Asics Gel-Kayano", Price = 160, Description = "Zapatillas de correr Asics Gel-Kayano con soporte y amortiguación superior.", Stock = 50, Image = "https://http2.mlstatic.com/D_NQ_NP_813147-MLA72978121592_112023-O.webp", Category = "Ropa y Calzado", Brand = "Asics", Avaible = true }
        };


        static int LastIdAssignedUser = 24; //Revisar que el numero sea siempre el ultimo id asignado de la lista
        static List<User> users = new List<User>
        {
            new User {Id = 1, Name = "Alejandro", LastName = "Di Stefano", Password = "ale",Email = "ale@gmail.com",UserName = "aleDiStefano",Adress = "Zeballos 1341",Orders = new List<Order>(),Products = new List<Product>(),UserType = UserType.Client,IsActive = true},
            new User {Id = 2, Name = "Marco", LastName = "Ruben", Password = "rc1",Email = "lakd@mail.com",UserName = "MarcoRuben",Adress = "Zeballos 1341",Orders = new List<Order>(),Products = new List<Product>(),UserType = UserType.Client,IsActive = true},
            new User {Id = 3,Name = "Gaston",LastName = "Koch",Password = "gaston",Email = "gaston@gmail.com",UserName = "GastonKoch",Adress = "",Orders = null,Products = null,UserType = UserType.Seller,IsActive = true},
            new User {Id = 4,Name = "Admin",LastName = "sysAdmin",Password = "admin",Email = "admin@easygrip.com",UserName = "SysAdmin",Adress = "",Orders = null,Products = null,UserType = UserType.SysAdmin, IsActive = true},
        
            // Clientes
            new User {Id = 5, Name = "Marco", LastName = "Perez", Password = "jp1", Email = "juan.perez@mail.com", UserName = "JuanPerez", Adress = "Calle Falsa 123", Orders = new List<Order>(), Products = new List<Product>(), UserType = UserType.Client, IsActive = true},
            new User {Id = 6, Name = "Ana", LastName = "Gomez", Password = "ag2", Email = "ana.gomez@mail.com", UserName = "AnaGomez", Adress = "Avenida Siempreviva 456", Orders = new List<Order>(), Products = new List<Product>(), UserType = UserType.Client, IsActive = true},
            new User {Id = 7, Name = "Luis", LastName = "Martinez", Password = "lm3", Email = "luis.martinez@mail.com", UserName = "LuisMartinez", Adress = "Boulevard San Juan 789", Orders = new List<Order>(), Products = new List<Product>(), UserType = UserType.Client, IsActive = true},
            new User {Id = 8, Name = "Maria", LastName = "Rodriguez", Password = "mr4", Email = "maria.rodriguez@mail.com", UserName = "MariaRodriguez", Adress = "Pasaje del Sol 101", Orders = new List<Order>(), Products = new List<Product>(), UserType = UserType.Client, IsActive = true},
            new User {Id = 9, Name = "Carlos", LastName = "Lopez", Password = "cl5", Email = "carlos.lopez@mail.com", UserName = "CarlosLopez", Adress = "Camino de los Pinos 202", Orders = new List<Order>(), Products = new List<Product>(), UserType = UserType.Client, IsActive = true},
            new User {Id = 10, Name = "Elena", LastName = "Garcia", Password = "eg6", Email = "elena.garcia@mail.com", UserName = "ElenaGarcia", Adress = "Ruta 9 KM 33", Orders = new List<Order>(), Products = new List<Product>(), UserType = UserType.Client, IsActive = true},
            new User {Id = 11, Name = "Miguel", LastName = "Hernandez", Password = "mh7", Email = "miguel.hernandez@mail.com", UserName = "MiguelHernandez", Adress = "Calle de la Luna 404", Orders = new List<Order>(), Products = new List<Product>(), UserType = UserType.Client, IsActive = true},
            new User {Id = 12, Name = "Laura", LastName = "Fernandez", Password = "lf8", Email = "laura.fernandez@mail.com", UserName = "LauraFernandez", Adress = "Avenida de los Poetas 505", Orders = new List<Order>(), Products = new List<Product>(), UserType = UserType.Client, IsActive = true},
            new User {Id = 13, Name = "Pedro", LastName = "Ruiz", Password = "pr9", Email = "pedro.ruiz@mail.com", UserName = "PedroRuiz", Adress = "Calle de las Flores 606", Orders = new List<Order>(), Products = new List<Product>(), UserType = UserType.Client, IsActive = true},
            new User {Id = 14, Name = "Sofia", LastName = "Diaz", Password = "sd10", Email = "sofia.diaz@mail.com", UserName = "SofiaDiaz", Adress = "Plaza del Sol 707", Orders = new List<Order>(), Products = new List<Product>(), UserType = UserType.Client, IsActive = true},
            // Vendedores
            new User {Id = 15, Name = "Lucia", LastName = "Perez", Password = "AnaP123", Email = "ana.perez@mail.com", UserName = "AnaPerez", Adress = "", Orders = null, Products = null, UserType = UserType.Seller, IsActive = true},
            new User {Id = 16, Name = "Carla", LastName = "Lopez", Password = "CarlosL321", Email = "carlos.lopez@mail.com", UserName = "CarlosLopez", Adress = "", Orders = null, Products = null, UserType = UserType.Seller, IsActive = true},
            new User {Id = 17, Name = "Micaela", LastName = "Gomez", Password = "MariaG456", Email = "maria.gomez@mail.com", UserName = "MariaGomez", Adress = "", Orders = null, Products = null, UserType = UserType.Seller, IsActive = true},
            new User {Id = 18, Name = "Jose", LastName = "Fernandez", Password = "JorgeF654", Email = "jorge.fernandez@mail.com", UserName = "JorgeFernandez", Adress = "", Orders = null, Products = null, UserType = UserType.Seller, IsActive = true},
            new User {Id = 19, Name = "Jose", LastName = "Martinez", Password = "LuciaM789", Email = "lucia.martinez@mail.com", UserName = "LuciaMartinez", Adress = "", Orders = null, Products = null, UserType = UserType.Seller, IsActive = true},
            new User {Id = 20, Name = "Pedro", LastName = "Diaz", Password = "PedroD987", Email = "pedro.diaz@mail.com", UserName = "PedroDiaz", Adress = "", Orders = null, Products = null, UserType = UserType.Seller, IsActive = true},
            new User {Id = 21, Name = "Lucia", LastName = "Suarez", Password = "ElenaS123", Email = "elena.suarez@mail.com", UserName = "ElenaSuarez", Adress = "", Orders = null, Products = null, UserType = UserType.Seller, IsActive = true},
            new User {Id = 22, Name = "Gaston", LastName = "Mendez", Password = "RicardoM321", Email = "ricardo.mendez@mail.com", UserName = "RicardoMendez", Adress = "", Orders = null, Products = null, UserType = UserType.Seller, IsActive = true},
            new User {Id = 23, Name = "Natalia", LastName = "Ramirez", Password = "NataliaR456", Email = "natalia.ramirez@mail.com", UserName = "NataliaRamirez", Adress = "", Orders = null, Products = null, UserType = UserType.Seller, IsActive = true},
            new User {Id = 24, Name = "Victor", LastName = "Morales", Password = "VictorM654", Email = "victor.morales@mail.com", UserName = "VictorMorales", Adress = "", Orders = null, Products = null, UserType = UserType.Seller, IsActive = true}


        };

        static int LastIdAssignedOrder = 1;
        static List<Order> orders = new List<Order>
        {
            new Order{Id = 1, User = users[0], Products = products.Take(4).ToList() },
        };




        #region ORDERS
        public List<Order> GetOrders()
        {
            return orders.ToList();
        }


        public Order CreateOrder(Order order)
        {
            order.Id = ++LastIdAssignedOrder;
            orders.Add(order);
            return order;
        }

        public Order GetOrderById(int id)
        {
            return orders.FirstOrDefault(x => x.Id == id);
        }
        #endregion

        #region PRODUCTS
        public List<Product> GetProducts()
        {
            return products.ToList();
        }

        public List<Product> GetProductsDisponible()
        {
            return products.Where(p => p.Avaible == true).ToList();
        }

        public Product GetProductById(int id)
        {
            return products.FirstOrDefault(x => x.Id == id);
        }

        public Product GetProductByName(string name)
        {
            return products.FirstOrDefault(x => x.Name == name);
        }

        public Product CreateProduct(Product product)
        {
            product.Id = ++LastIdAssignedProduct;
            products.Add(product);
            return product;
        }

        public void UpdateProduct(Product product)
        {
            var obj = products.FirstOrDefault(x => x.Id == product.Id);
            obj.Name = product.Name;
        }

        public void UpdateProductDisponible(Product product)
        {
            var obj = products.FirstOrDefault(x => x.Id == product.Id);
            obj.Avaible = product.Avaible;
        }

        public void DeleteProduct(Product product)
        {
            products.Remove(product);
        }
        #endregion

        #region USER
        public List<User> GetUsers()
        {
            return users.ToList();
        }

        public User GetUserById(int id)
        {
            return users.FirstOrDefault(x => x.Id == id);
        }
        public User GetUserByEmail(string email)
        {
            return users.FirstOrDefault(x => x.Email == email);
        }

        public List<User> GetUsersByName(string name)
        {
            return users.Where(x => x.Name == name).ToList();
        }

        public List<User> GetUserByType(UserType type)
        {
            List<User> filteredUsers = users.Where(x => x.UserType == type).ToList();
            return filteredUsers;
        }

        public User CreateUser(User user)
        {
            user.Id = ++LastIdAssignedUser;
            users.Add(user);
            return user;
        }

        public void UpdateUser(User user)
        {
            var obj = users.FirstOrDefault(x => x.Id == user.Id);
            obj.Name = user.Name;
            obj.LastName = user.LastName;
            obj.Password = user.Password;
            obj.Email = user.Email;
            obj.UserName = user.UserName;
            obj.Adress = user.Adress;
        }

        public void DeleteUser(User user)
        {
            users.Remove(user);
        }

        public void ActiveUser(int id)
        {
            var obj = users.FirstOrDefault(x => x.Id == id);
            obj.IsActive = true;
        }

        public bool ValidateUserCredentials(string userEmail, string userPassword)
        {
            return users.Any(p => p.Email == userEmail && p.Password == userPassword);
        }

        public bool ValidateUserNickName(string userNickName)
        {
            return users.Any(p => p.UserName == userNickName);
        }

        public bool ValidateUserMail(string userMail)
        {
            return users.Any(p => p.Email == userMail);
        }
        #endregion

    }
}
