
using DataAccess.Entities;
using AutoMapper;
using CommonModel.Project;
using CommonModel.Stage;

namespace API.Util
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Project
            CreateMap<Project, ProjectDto>();
            CreateMap<CreateProjectDto, Project>();
            CreateMap<AppUser, MemberDto>();
            CreateMap<UpdateProjectDto, Project>();

            //Stage
            CreateMap<Stage, StageDto>();
            CreateMap<CreateStageDto, Stage>();
            CreateMap<UpdateStageDto, Stage>();
        }
    }
}