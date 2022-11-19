using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommonModel.Project
{
    public class ProjectDto
    {
        public string Id { get; set; } = "";
        public string Name { get; set; } = "";
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public string? CreatorId { get; set; }
        public List<MemberDto> Members { get; set; } = new List<MemberDto>();
    }
}