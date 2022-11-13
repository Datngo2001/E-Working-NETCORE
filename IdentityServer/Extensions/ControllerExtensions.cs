using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IndetityServer.Models.Account;
using Microsoft.AspNetCore.Mvc;

namespace IndetityServer.Extensions
{
    public static class ControllerExtensions
    {
        public static IActionResult LoadingPage(this Controller controller, string viewName, string redirectUri)
        {
            controller.HttpContext.Response.StatusCode = 200;
            controller.HttpContext.Response.Headers["Location"] = "";

            return controller.View(viewName, new RedirectViewModel { RedirectUrl = redirectUri });
        }
    }
}