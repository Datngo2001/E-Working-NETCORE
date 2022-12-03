using CommonModel.Board.Column;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonModel.Board
{
    public class BoardDto
    {
        public string Id { get; set; } = "";
        public string ProjectId { get; set; } = "";
        public string StageId { get; set; } = "";
        public List<ColumnDto> Columns { get; set; } = new List<ColumnDto>();
    }
}
