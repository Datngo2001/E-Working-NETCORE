using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommonModel.Error
{
    public class MultipleError
    {
        public IEnumerable<string>? Messages { get; set; }
    }
}