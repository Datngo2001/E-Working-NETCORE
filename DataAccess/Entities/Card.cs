using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    public class Card
    {
        public string Id { get; set; } = "";
        public string Name { get; set; } = "";
        public string Message { get; set; } = "";
        public DateTime CreateDate { get; set; } = DateTime.Now;

        public string? AssignToId { get; set; }
        public AppUser? AssignTo { get; set; }

        public string ColumnId { get; set; }
        public Column Column { get; set; }

        public string? StageId { get; set; }
        public Stage? Stage { get; set; }

        public string? CreatorId { get; set; }
        public AppUser? Creator { get; set; }

        public string? ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}