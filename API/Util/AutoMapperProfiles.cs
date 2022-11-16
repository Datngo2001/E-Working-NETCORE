
using DataAccess.Entities;
using AutoMapper;
using CommonModel.Project;

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
        }
    }
}