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

        [HttpPatch("{stageId}/project/{projectId}/name")]
        public async Task<ActionResult<StageDto>> UpdateStageName(string stageId, string projectId, [FromBody] UpdateStageNameDto updateStageNameDto)
        {
            return await stageRepository.UpdateStageName(updateStageNameDto, stageId);
        }


        [HttpPatch("{stageId}/project/{projectId}/start-date")]
        public async Task<ActionResult<StageDto>> UpdateStageStartDate(string stageId, string projectId, [FromBody] UpdateStageStartDateDto updateStageStartDate)
        {
            return await stageRepository.UpdateStageStartDate(updateStageStartDate, stageId);
        }

        [HttpPatch("{stageId}/project/{projectId}/end-date")]
        public async Task<ActionResult<StageDto>> UpdateStageEndDate(string stageId, string projectId, [FromBody] UpdateStageEndDateDto updateStageEndDateDto)
        {
            return await stageRepository.UpdateStageEndDate(updateStageEndDateDto, stageId);
        }


        [HttpDelete("{stageId}/project/{projectId}")]
        public async Task<ActionResult<StageDto>> UpdateStage(string projectId, string stageId)
        {
            return await stageRepository.DeleteStage(stageId);
        }
    }
}