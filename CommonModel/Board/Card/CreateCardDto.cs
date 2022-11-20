using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonModel.Board.Card
{
    public class CreateCardDto
    {
        [Required]
        public string Name { get; set; } = "";
        public string Message { get; set; } = "";
        public string? AssignToId { get; set; }
        [Required]
        public string ColumnId { get; set; }
        [Required]
        public string? StageId { get; set; }
    }
}
