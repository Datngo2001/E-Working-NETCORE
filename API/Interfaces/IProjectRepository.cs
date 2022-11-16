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
        Task<List<ProjectDto>> GetMyProjects(string userId);
        Task<List<ProjectDto>> GetJoinedProjects(string userId);
        Task<ProjectDto> CreateProject(CreateProjectDto createProjectDto, string userId);
        Task<ProjectDto> UpdateProject(string projectId, UpdateProjectDto updateProjectDto);
    }
}