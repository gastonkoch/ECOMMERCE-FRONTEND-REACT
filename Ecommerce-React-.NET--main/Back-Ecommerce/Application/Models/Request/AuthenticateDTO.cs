using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.Request
{
    public class AuthenticateDTO
    {
        public string userEmail { get; set; }
        public string userPassword { get; set; }
    }
}
