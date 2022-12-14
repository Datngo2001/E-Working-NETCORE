using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using CommonModel.Stage;
using DataAccess;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class StageRepository : IStageRepository
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IMapper mapper;
        public StageRepository(ApplicationDbContext dbContext, IMapper mapper)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }

        public async Task<StageDto> CreateStage(CreateStageDto createStageDto, string userId, string projectId)
        {
            var newStage = new Stage();
            newStage.CreateDate = DateTime.Now;

            mapper.Map(createStageDto, newStage);

            newStage.Id = Guid.NewGuid().ToString();
            newStage.CreatorId = userId;
            newStage.ProjectId = projectId;

            dbContext.Stages.Add(newStage);

            await dbContext.SaveChangesAsync();

            return mapper.Map<StageDto>(newStage);
        }

        public async Task<StageDto> DeleteStage(string stageId)
        {
            var stage = await dbContext.Stages.FirstAsync(p => p.Id == stageId);
            dbContext.Stages.Remove(stage);
            await dbContext.SaveChangesAsync();
            return mapper.Map<StageDto>(stage);
        }

        public async Task<string> GetLastStage()
        {
            return await dbContext.Stages.OrderBy(s => s.CreateDate).Select(s => s.Id).LastAsync();
        }

        public async Task<List<StageDto>> GetProjectStage(string projectId)
        {
            return await dbContext.Stages
                .Where(s => s.ProjectId == projectId)
                .ProjectTo<StageDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<StageDto> UpdateStage(UpdateStageDto updateStageDto, string stageId)
        {
            var stage = await dbContext.Stages.FirstAsync(p => p.Id == stageId);
            mapper.Map(updateStageDto, stage);

            await dbContext.SaveChangesAsync();

            return mapper.Map<StageDto>(stage);
        }

        public async Task<StageDto> UpdateStageEndDate(UpdateStageEndDateDto updateStageEndDateDto, string stageId)
        {
            var stage = await dbContext.Stages.FirstAsync(p => p.Id == stageId);

            stage.EndDate = updateStageEndDateDto.EndDate;

            await dbContext.SaveChangesAsync();

            return mapper.Map<StageDto>(stage);
        }

        public async Task<StageDto> UpdateStageName(UpdateStageNameDto updateStageNameDto, string stageId)
        {
            var stage = await dbContext.Stages.FirstAsync(p => p.Id == stageId);

            stage.Name = updateStageNameDto.Name;

            await dbContext.SaveChangesAsync();

            return mapper.Map<StageDto>(stage);
        }

        public async Task<StageDto> UpdateStageStartDate(UpdateStageStartDateDto updateStageStartDate, string stageId)
        {
            var stage = await dbContext.Stages.FirstAsync(p => p.Id == stageId);

            stage.StartDate = updateStageStartDate.StartDate;

            await dbContext.SaveChangesAsync();

            return mapper.Map<StageDto>(stage);
        }
    }
}