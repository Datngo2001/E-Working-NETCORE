using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CommonModel.Project
{
    public class CreateProjectDto
    {
        [Required]
        [MinLength(1)]
        public string Name { get; set; } = "";
    }
}