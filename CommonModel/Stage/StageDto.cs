using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommonModel.Stage
{
    public class StageDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? CreatorId { get; set; }
        public Guid ProjectId { get; set; }
    }
}