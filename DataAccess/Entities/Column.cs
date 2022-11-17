using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    public class Column
    {
        public string Id { get; set; } = "";
        public string Name { get; set; } = "";
        public DateTime CreateDate { get; set; } = DateTime.Now;

        public string BoardId { get; set; }
        public Board Board { get; set; }

        public string? CreatorId { get; set; }
        public AppUser? Creator { get; set; }

        public List<Card> Cards { get; set; } = new List<Card>();
    }
}