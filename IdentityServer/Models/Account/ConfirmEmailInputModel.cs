using System.ComponentModel.DataAnnotations;

namespace IdentityServer.Models.Account
{
    public class ConfirmEmailInputModel
    {
        public string Otp { get; set; } = "";
        public string Email { get; set; }
        public string ReturnUrl { get; set; } = "";

    }
}
