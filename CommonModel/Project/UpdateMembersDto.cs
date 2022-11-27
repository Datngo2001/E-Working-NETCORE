using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommonModel.Project
{
    public class UpdateMembersDto
    {
        public List<string> MemberIds { get; set; } = new List<string>();
    }
}