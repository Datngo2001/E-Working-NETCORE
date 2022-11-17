using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CommonModel.Stage;
using Microsoft.AspNetCore.Identity;
using DataAccess.Entities;

namespace API.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class StageController : _APIController
    {
        private readonly IStageRepository stageRepository;
        private readonly UserManager<AppUser> userManager;

        public StageController(IStageRepository stageRepository, UserManager<AppUser> userManager)
        {
            this.stageRepository = stageRepository;
            this.userManager = userManager;
        }

        [HttpGet("project/{projectId}/all")]
        public async Task<ActionResult<List<StageDto>>> GetProjectStages(string projectId)
        {
            return await stageRepository.GetProjectStage(projectId);
        }

        [HttpPost("project/{projectId}")]
        public async Task<ActionResult<StageDto>> CreateStage(string projectId, [FromBody] CreateStageDto createStageDto)
        {
            var userId = userManager.GetUserId(User);
            return await stageRepository.CreateStage(createStageDto, userId, projectId);
        }

        [HttpPut("project/{projectId}")]
        public async Task<ActionResult<StageDto>> UpdateStage(string projectId, [FromBody] UpdateStageDto updateStageDto)
        {
            var userId = userManager.GetUserId(User);
            return await stageRepository.UpdateStage(updateStageDto, userId);
        }

        [HttpDelete("project/{projectId}/{stageId}")]
        public async Task<ActionResult<StageDto>> UpdateStage(string projectId, string stageId)
        {
            return await stageRepository.DeleteStage(stageId);
        }
    }
}