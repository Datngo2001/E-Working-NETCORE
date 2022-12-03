using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using CommonModel.Project;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ProjectController : _APIController
    {
        private readonly IProjectRepository projectRepository;
        private readonly UserManager<AppUser> userManager;
        public ProjectController(IProjectRepository projectRepository, UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
            this.projectRepository = projectRepository;
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> PostProject(CreateProjectDto createProjectDto)
        {
            var userId = userManager.GetUserId(User);
            var result = await projectRepository.CreateProject(createProjectDto, userId);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectDto>> PutProject(string id, UpdateProjectDto updateProjectDto)
        {
            var result = await projectRepository.UpdateProject(id, updateProjectDto);
            return result;
        }

        [HttpPut("{id}/members")]
        public async Task<ActionResult<ProjectDto>> UpdateProjectMembers(string id, UpdateMembersDto updateMembersDto)
        {
            var result = await projectRepository.UpdateMembers(id, updateMembersDto);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProject(string id)
        {
            var result = await projectRepository.GetProjectById(id);
            return result;
        }

        [HttpGet("{id}/members")]
        public async Task<ActionResult<List<MemberDto>>> GetProjectMembers(string id)
        {
            var result = await projectRepository.GetProjectMembers(id);
            return result;
        }

        [HttpGet("my/all")]
        public async Task<ActionResult<List<ProjectDto>>> GetMyProjects()
        {
            var userId = userManager.GetUserId(User);
            var result = await projectRepository.GetMyProjects(userId);
            return result;
        }

        [HttpGet("joined")]
        public async Task<ActionResult<List<ProjectDto>>> GetMyJoinedProjects()
        {
            var userId = userManager.GetUserId(User);
            var result = await projectRepository.GetJoinedProjects(userId);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjectDto>> DeleteProject(string id)
        {
            var result = await projectRepository.DeleteProject(id);
            return result;
        }
    }
}