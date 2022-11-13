using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;

namespace IdentityServer
{
    public class Config
    {
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

                    RedirectUris = { "https://localhost:7259/signin-oidc" },
                    FrontChannelLogoutUri = "https://localhost:7259/signout-oidc",
                    PostLogoutRedirectUris = { "https://localhost:7259/signout-callback-oidc" },

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

                    RedirectUris =           { "http://localhost:3000/callback" },
                    PostLogoutRedirectUris = { "http://localhost:3000/" },
                    AllowedCorsOrigins =     { "http://localhost:3000" },

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