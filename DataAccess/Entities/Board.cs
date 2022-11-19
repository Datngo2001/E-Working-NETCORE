using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    public class Board
    {
        public string Id { get; set; } = "";
        public string ProjectId { get; set; } = "";
        public Project Project { get; set; }
        public List<Column> Columns { get; set; } = new List<Column>();
    }
}