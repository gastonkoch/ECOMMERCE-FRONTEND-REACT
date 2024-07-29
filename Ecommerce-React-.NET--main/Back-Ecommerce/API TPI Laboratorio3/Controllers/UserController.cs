using Application.Interfaces;
using Application.Models;
using Application.Models.Request;
using Application.Services;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_TPI_Laboratorio3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<User>> GetAllUsers()
        {
            try
            {
                return Ok(_userService.GetUsers());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUserById([FromRoute] int id)
        {
            try
            {
                return Ok(_userService.GetUserById(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("email/{email}")]
        public ActionResult<User> GetUserByEmail([FromRoute] string email)
        {
            try
            {
                return Ok(_userService.GetUserByEmail(email));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("name/{name}")]
        public ActionResult<List<User>> GetUsersByName([FromRoute] string name)
        {
            try
            {
                return Ok(_userService.GetUsersByName(name));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("type/{type}")]
        public ActionResult<List<User>> GetUserByType([FromRoute] UserType type)
        {
            try
            {
                return Ok(_userService.GetUserByType(type));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public void UpdateUser([FromRoute] int id, [FromBody] UserDTO user)
        {
            _userService.UpdateUser(id, user);
        }

        [HttpDelete("{id}")]
        public void DeleteUser([FromRoute] int id)
        {
            _userService.DeleteUser(id);
        }


        [HttpPut("/{id}")]
        public void ActiveUser([FromRoute] int id)
        {
            _userService.ActiveUser(id);
        }

        [HttpPost("/customer")]
        public User CreateUserClient([FromBody] UserDTO user)
        {
            return _userService.CreateUserClient(user);
        }

        [HttpPost("/seller")]
        public User CreateUserSeller([FromBody] UserDTO user)
        {
            return _userService.CreateUserSeller(user);
        }




        [HttpPost("validate")]
        public IActionResult ValidateUserCredentials([FromBody] AuthenticateDTO authenticate)
        {
            if (authenticate == null || string.IsNullOrEmpty(authenticate.userEmail) || string.IsNullOrEmpty(authenticate.userPassword))
            {
                return BadRequest("Invalid request payload.");
            }

            bool isValid = _userService.ValidateUserCredentials(authenticate.userEmail, authenticate.userPassword);

            if (isValid)
            {
                return Ok(new { Message = "Authentication successful." });
            }
            else
            {
                return Unauthorized(new { Message = "Invalid email or password." });
            }
        }

        [HttpPost("nickNameAvaible/{nickName}")]
        public IActionResult ValidateUserNickName([FromRoute] string nickName)
        {
            bool isValid = _userService.ValidateUserNickName(nickName);
            isValid = !isValid;
            if (isValid)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }


        [HttpPost("EmailRegistered/{email}")]
        public IActionResult ValidateUserEmail([FromRoute] string email)
        {
            bool isValid = _userService.ValidateUserEmail(email);
            isValid = !isValid;
            if (isValid)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

    }
}
