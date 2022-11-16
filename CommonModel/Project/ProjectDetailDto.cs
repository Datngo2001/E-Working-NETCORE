using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonModel.Project
{
    class ProjectDetailDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public string? CreatorId { get; set; }
        public List<MemberDto> Members { get; set; } = new List<MemberDto>();
    }
}
