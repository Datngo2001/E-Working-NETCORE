using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonModel.Board.Card
{
    public class CreateCardDto
    {
        public string Name { get; set; } = "";
        public string Message { get; set; } = "";
        public string? AssignToId { get; set; }
        public string ColumnId { get; set; }
        public string? StageId { get; set; }
    }
}
