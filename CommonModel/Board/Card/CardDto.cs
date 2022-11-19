using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonModel.Board.Card
{
    public class CardDto
    {
        public string Id { get; set; } = "";
        public string Name { get; set; } = "";
        public string Message { get; set; } = "";
        public DateTime CreateDate { get; set; } = DateTime.Now;

        public string? AssignToId { get; set; }

        public string ColumnId { get; set; }

        public string? StageId { get; set; }

        public string? CreatorId { get; set; }

        public string? ProjectId { get; set; }
    }
}
