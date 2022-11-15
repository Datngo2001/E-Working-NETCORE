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

    public class ProjectController : _APIController
    {
        private readonly IProjectRepository projectRepository;
        private readonly UserManager<AppUser> userManager;
        public ProjectController(IProjectRepository projectRepository, UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
            this.projectRepository = projectRepository;
        }

        //[Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost]
        public async Task<ActionResult<ProjectDto>> PostProject(CreateProjectDto createProjectDto)
        {
            var userId = userManager.GetUserId(User);
            var result = await projectRepository.CreateProject(createProjectDto, userId);
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
    }
}