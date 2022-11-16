using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonModel.Project
{
    public class UpdateProjectDto
    {
        [Required]
        [MinLength(1)]
        public string Name { get; set; } = "";

        public List<string> UserIds { get; set; } = new List<string>();
    }
}
