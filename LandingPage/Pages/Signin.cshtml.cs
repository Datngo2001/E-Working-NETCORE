using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace LandingPage.Pages
{
    [Authorize]
    public class SigninModel : PageModel
    {
        public IActionResult OnGet()
        {
            return Redirect("/");
        }
    }
}
