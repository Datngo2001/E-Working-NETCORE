using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CommonModel.Board.Card
{
    public class MoveCardDto
    {
        [Required]
        public string CardId { get; set; }
        [Required]
        public string StartColumn { get; set; }
        [Required]
        public string EndColumn { get; set; }
    }
}