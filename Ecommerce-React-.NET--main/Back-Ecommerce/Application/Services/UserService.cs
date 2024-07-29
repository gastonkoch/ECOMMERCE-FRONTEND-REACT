using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IMainRepository _mainRepository;
        public UserService(IMainRepository mainRepository)
        {
            _mainRepository = mainRepository;
        }

        public List<User> GetUsers()
        {
            return _mainRepository.GetUsers();
        }

        public User GetUserById(int id)
        {
            return _mainRepository.GetUserById(id);
        }
        public User GetUserByEmail(string email)
        {
            return _mainRepository.GetUserByEmail(email);
        }

        public List<User> GetUsersByName(string name)
        {
            return _mainRepository.GetUsersByName(name);
        }

        public List<User> GetUserByType(UserType type)
        {
            return _mainRepository.GetUserByType(type);
        }

        public User CreateUserClient(UserDTO user)
        {
            var userCrear = new User()
            {
                Name = user.Name,
                LastName = user.LastName,
                Password = user.Password,
                Email = user.Email,
                UserName = user.UserName,
                Adress = user.Adress,
                UserType = UserType.Client,
                IsActive = true,
            };
            _mainRepository.CreateUser(userCrear);
            return _mainRepository.GetUserById(userCrear.Id);
        }

        public User CreateUserSeller(UserDTO user)
        {
            var userCrear = new User()
            {
                Name = user.Name,
                LastName = user.LastName,
                Password = user.Password,
                Email = user.Email,
                UserName = user.UserName,
                Adress = user.Adress,
                UserType = UserType.Seller,
                IsActive = true,
            };
            _mainRepository.CreateUser(userCrear);
            return _mainRepository.GetUserById(userCrear.Id);
        }

        public void UpdateUser(int id, UserDTO user)
        {
            var usuario = _mainRepository.GetUserById(id);
            usuario.Name = user.Name;
            usuario.LastName = user.LastName;
            usuario.Password = user.Password;
            usuario.Email = user.Email;
            usuario.UserName = user.UserName;
            usuario.Adress = user.Adress;
            _mainRepository.UpdateUser(usuario);
        }

        public void DeleteUser(int id)
        {
            var usuarioDelete = _mainRepository.GetUserById(id);
            _mainRepository.DeleteUser(usuarioDelete);
        }

        public void ActiveUser(int id)
        {
            _mainRepository.ActiveUser(id);
        }

        public bool ValidateUserCredentials(string userEmail, string userPassword)
        {
            return _mainRepository.ValidateUserCredentials(userEmail, userPassword);

        }

        public bool ValidateUserNickName(string userNickName)
        {
            return _mainRepository.ValidateUserNickName(userNickName);
        }

        public bool ValidateUserEmail(string userEmail)
        {
            return _mainRepository.ValidateUserMail(userEmail);
        }
    }
}
