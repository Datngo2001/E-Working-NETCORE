using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommonModel.Project;

namespace API.Interfaces
{
    public interface IProjectRepository
    {
        Task<ProjectDto> GetProjectById(string id);
        Task<List<MemberDto>> GetProjectMembers(string id);
        Task<ProjectDto> CreateProject(CreateProjectDto createProjectDto, string userId);
    }
}