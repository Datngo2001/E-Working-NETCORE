using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    public class Stage
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string? CreatorId { get; set; }
        public AppUser? Creator { get; set; }

        public Guid ProjectId { get; set; }
        public Project Project { get; set; } = new Project();

        public List<Card> Cards { get; set; } = new List<Card>();
    }
}