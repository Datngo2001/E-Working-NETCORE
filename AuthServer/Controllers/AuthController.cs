using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AuthServer.Data.Entities;
using CommonModel.Auth;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AuthServer.Controllers
{
    public class AuthController : BaseApiController
    {
        private readonly SignInManager<AppUser> signInManager;
        private readonly UserManager<AppUser> userManager;
        private readonly IIdentityServerInteractionService interaction;
        public AuthController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, IIdentityServerInteractionService interaction)
        {
            this.interaction = interaction;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost("signin")]
        public async Task<ActionResult> Signin(SigninRequestDto model)
        {
            var result = await signInManager.PasswordSignInAsync(model.Username, model.Password, true, true);
            if (result.Succeeded)
            {
                return Redirect(model.ReturnUrl);
            }
            return BadRequest("Incorrect username or password");
        }

        [HttpPost("signup")]
        public async Task<ActionResult> Signup(SignupRequestDto model)
        {
            var newUser = new AppUser
            {
                UserName = model.UserName,
                Email = model.Email,
                EmailConfirmed = false,
            };

            var result = await userManager.CreateAsync(newUser, model.Password);
            if (!result.Succeeded)
            {
                var messages = new List<string>();
                foreach (var err in result.Errors)
                {
                    messages.Add(err.Description);
                }
                BadRequest(messages);
            }

            result = await userManager.AddClaimsAsync(newUser, new Claim[]{
                        new Claim(JwtClaimTypes.Name, model.FirstName + model.LastName),
                        new Claim(JwtClaimTypes.GivenName, model.LastName),
                        new Claim(JwtClaimTypes.FamilyName, model.FirstName),
                    });
            if (!result.Succeeded)
            {
                var messages = new List<string>();
                foreach (var err in result.Errors)
                {
                    messages.Add(err.Description);
                }
                BadRequest(messages);
            }

            return Redirect(model.ReturnUrl);
        }

        [HttpPost("signup")]
        public async Task<ActionResult> Signout(string logoutId)
        {
            var identityProvider = User.FindFirst(JwtClaimTypes.IdentityProvider)?.Value;
            if (identityProvider != null && identityProvider != IdentityServer4.IdentityServerConstants.LocalIdentityProvider)
            {
                var providerSupportsSignout = await HttpContext.GetSchemeSupportsSignOutAsync(identityProvider);
                if (providerSupportsSignout)
                {
                    if (logoutId == null)
                    {
                        logoutId = await interaction.CreateLogoutContextAsync();
                    }

                    string url = Url.Action("Logout", new { logoutId = logoutId });
                    return SignOut(new AuthenticationProperties { RedirectUri = url }, identityProvider);
                }
            }
            else if (identityProvider == IdentityServer4.IdentityServerConstants.LocalIdentityProvider)
            {
                await signInManager.SignOutAsync();
            }
            return Ok();
        }
    }
}