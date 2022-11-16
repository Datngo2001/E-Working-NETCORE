using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;
using CommonModel.Project;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using DataAccess.Entities;

namespace API.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IMapper mapper;
        public ProjectRepository(ApplicationDbContext dbContext, IMapper mapper)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }

        public async Task<ProjectDto> CreateProject(CreateProjectDto createProjectDto, string userId)
        {
            var newProject = new Project();
            newProject.Board = new Board();

            mapper.Map(createProjectDto, newProject);

            newProject.CreatorId = userId;

            dbContext.Projects.Add(newProject);

            await dbContext.SaveChangesAsync();

            return mapper.Map<ProjectDto>(newProject);
        }

        public async Task<List<ProjectDto>> GetJoinedProjects(string userId)
        {
            return await dbContext.Projects
                .Where(p => p.Members.Any(m => m.Id == userId))
                .ProjectTo<ProjectDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<List<ProjectDto>> GetMyProjects(string userId)
        {
            return await dbContext.Projects
                .Where(p => p.Creator != null && p.Creator.Id == userId)
                .ProjectTo<ProjectDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<ProjectDto> GetProjectById(string id)
        {
            return await dbContext.Projects
                .ProjectTo<ProjectDto>(mapper.ConfigurationProvider)
                .FirstAsync(p => p.Id == new Guid(id));
        }

        public async Task<List<MemberDto>> GetProjectMembers(string id)
        {
            return await dbContext.Users
                .Where(u => u.JoinedProjects.Any(p => p.Id == new Guid(id)))
                .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<ProjectDto> UpdateProject(string projectId, UpdateProjectDto updateProjectDto)
        {
            var project = await dbContext.Projects.Include(p=>p.Members).FirstAsync(p => p.Id == new Guid(projectId));
            mapper.Map(updateProjectDto, project);

            foreach (var member in project.Members)
            {
                if(!updateProjectDto.UserIds.Contains(member.Id)){
                    project.Members.Remove(member);
                }
            }

            foreach (var id in updateProjectDto.UserIds)
            {
                if (project.Members.FirstOrDefault(m=>m.Id == id) == null)
                {
                    project.Members.Add(new AppUser
                    {
                        Id = id
                    });
                }
            }

            await dbContext.SaveChangesAsync();    

            return mapper.Map<ProjectDto>(project);
        }
    }
}