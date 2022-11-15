using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    public class Card
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public string Message { get; set; } = "";
        public DateTime CreateDate { get; set; } = DateTime.Now;

        public string? AssignToId { get; set; }
        public AppUser? AssignTo { get; set; }

        public Guid ColumnId { get; set; }
        public Column Column { get; set; } = new Column();

        public Guid? StageId { get; set; }
        public Stage? Stage { get; set; }

        public string? CreatorId { get; set; }
        public AppUser? Creator { get; set; }

        public Guid? ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}