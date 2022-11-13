using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public DateTime CreateDate { get; set; } = DateTime.Now;

        public string? CreatorId { get; set; }
        public AppUser? Creator { get; set; }

        public List<AppUser> Members { get; set; } = new List<AppUser>();

        public List<Stage> Stages { get; set; } = new List<Stage>();

        public Board Board { get; set; } = new Board();
    }
}