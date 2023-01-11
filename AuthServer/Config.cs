using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4;
using IdentityServer4.Models;

namespace AuthServer
{
    public class Config
    {
        public static string ClientUrl = "";
        public static string LandingPageUrl = "";
        public static IEnumerable<IdentityResource> IdentityResources =>
           new IdentityResource[]
           {
                        new IdentityResources.OpenId(),
                        new IdentityResources.Profile(),
           };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("API"),
            };

        public static IEnumerable<Client> Clients =>
        new Client[]
        {
                new Client
                {
                    ClientId = "LandingPage",
                    ClientSecrets = { new Secret("49C1A7E1-0C79-4A89-A3D6-A37998AB86B0".Sha256()) },

                    AllowedGrantTypes = GrantTypes.Code,

                    RedirectUris = { $"{LandingPageUrl}/signin-oidc" },
                    FrontChannelLogoutUri = $"{LandingPageUrl}/signout-oidc",
                    PostLogoutRedirectUris = { $"{LandingPageUrl}/signout-callback-oidc" },

                    AllowOfflineAccess = true,
                    AllowedScopes = {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "API"
                    }
                },
                new Client
                {
                    ClientId = "ClientApp",
                    ClientName = "JavaScript Client App",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,

                    RedirectUris =           { $"{ClientUrl}/" },
                    PostLogoutRedirectUris = { $"{ClientUrl}/" },
                    AllowedCorsOrigins =     { $"{ClientUrl}" },

                    AllowOfflineAccess = true,

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "API"
                    }
                }
        };
    }
}