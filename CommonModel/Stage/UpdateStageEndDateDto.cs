using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CommonModel.Stage
{
    public class UpdateStageEndDateDto
    {
        [Required]
        public DateTime EndDate { get; set; }
    }
}