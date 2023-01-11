using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonModel.Auth
{
    public class SigninRequestDto
    {
        [Required]
        public string Username { get; set; } = "";
        [Required]
        public string Password { get; set; } = "";
        public bool RememberLogin { get; set; }
        public string ReturnUrl { get; set; } = "";
    }
}
