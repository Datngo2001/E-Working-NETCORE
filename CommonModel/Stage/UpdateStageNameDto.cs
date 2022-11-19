using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CommonModel.Stage
{
    public class UpdateStageNameDto
    {
        [Required]
        [MinLength(1)]
        public string Name { get; set; } = "";
    }
}