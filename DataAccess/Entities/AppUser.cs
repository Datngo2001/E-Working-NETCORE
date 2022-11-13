using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DataAccess.Entities
{
    public class AppUser : IdentityUser
    {
        public List<Project> Projects { get; set; } = new List<Project>();
        public List<Project> JoinedProjects { get; set; } = new List<Project>();
    }
}