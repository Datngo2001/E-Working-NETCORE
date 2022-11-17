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
        Task<StageDto> CreateStage(CreateStageDto createStageDto, string userId, string projectId);
        Task<StageDto> UpdateStage(UpdateStageDto updateStageDto, string stageId);
        Task<StageDto> DeleteStage(string stageId);
    }
}