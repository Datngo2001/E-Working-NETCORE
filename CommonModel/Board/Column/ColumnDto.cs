using CommonModel.Board.Card;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonModel.Board.Column
{
    public class ColumnDto
    {
        public string Id { get; set; } = "";
        public string Name { get; set; } = "";
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public string BoardId { get; set; }
        public string? CreatorId { get; set; }
        public List<CardDto> Cards { get; set; } = new List<CardDto>();
    }
}
