using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonModel.Error;
using Microsoft.AspNetCore.Mvc;

namespace AuthServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected BadRequestObjectResult BadRequest(string message)
        {
            return BadRequest(new CommonError()
            {
                Message = message
            });
        }

        protected BadRequestObjectResult BadRequest(IEnumerable<string> messages)
        {
            return BadRequest(new MultipleError()
            {
                Messages = messages
            });
        }
    }
}