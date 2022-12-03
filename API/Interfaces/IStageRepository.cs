using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonModel.Stage;

namespace API.Interfaces
{
    public interface IStageRepository
    {
        Task<List<StageDto>> GetProjectStage(string projectId);
        Task<string> GetLastStage();
        Task<StageDto> CreateStage(CreateStageDto createStageDto, string userId, string projectId);
        Task<StageDto> UpdateStage(UpdateStageDto updateStageDto, string stageId);
        Task<StageDto> UpdateStageName(UpdateStageNameDto updateStageNameDto, string stageId);
        Task<StageDto> UpdateStageStartDate(UpdateStageStartDateDto updateStageStartDate, string stageId);
        Task<StageDto> UpdateStageEndDate(UpdateStageEndDateDto updateStageEndDateDto, string stageId);
        Task<StageDto> DeleteStage(string stageId);
    }
}