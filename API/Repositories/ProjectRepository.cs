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
            newProject.Board = new Board() { Id = Guid.NewGuid().ToString() };
            newProject.CreateDate = DateTime.Now;

            mapper.Map(createProjectDto, newProject);

            newProject.Id = Guid.NewGuid().ToString();
            newProject.CreatorId = userId;

            dbContext.Projects.Add(newProject);

            await dbContext.SaveChangesAsync();

            return mapper.Map<ProjectDto>(newProject);
        }

        public async Task<List<ProjectDto>> GetJoinedProjects(string userId)
        {
            return await dbContext.Projects
                .Where(p => p.Members.Any(m => m.Id == userId))
                .OrderBy(p => p.CreateDate)
                .ProjectTo<ProjectDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<List<ProjectDto>> GetMyProjects(string userId)
        {
            return await dbContext.Projects
                .Where(p => p.Creator != null && p.Creator.Id == userId)
                .OrderBy(p => p.CreateDate)
                .ProjectTo<ProjectDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<ProjectDto> GetProjectById(string id)
        {
            return await dbContext.Projects
                .ProjectTo<ProjectDto>(mapper.ConfigurationProvider)
                .FirstAsync(p => p.Id == id);
        }

        public async Task<List<MemberDto>> GetProjectMembers(string id)
        {
            return await dbContext.Users
                .Where(u => u.JoinedProjects.Any(p => p.Id == id))
                .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<ProjectDto> UpdateProject(string projectId, UpdateProjectDto updateProjectDto)
        {
            var project = await dbContext.Projects.Include(p => p.Members).FirstAsync(p => p.Id == projectId);
            mapper.Map(updateProjectDto, project);

            await dbContext.SaveChangesAsync();

            return mapper.Map<ProjectDto>(project);
        }

        public async Task<ProjectDto> UpdateMembers(string projectId, UpdateMembersDto updateMembersDto)
        {
            var project = await dbContext.Projects.Include(p => p.Members).FirstAsync(p => p.Id == projectId);

            for (int i = 0; i < project.Members.Count; i++)
            {
                if (!updateMembersDto.MemberIds.Contains(project.Members[i].Id))
                {
                    project.Members.Remove(project.Members[i]);
                }
            }

            foreach (var id in updateMembersDto.MemberIds)
            {
                if (project.Members.FirstOrDefault(m => m.Id == id) == null)
                {
                    var user = await dbContext.Users.FirstAsync(u => u.Id == id);
                    project.Members.Add(user);
                }
            }

            await dbContext.SaveChangesAsync();

            return mapper.Map<ProjectDto>(project);
        }

        public async Task<ProjectDto> DeleteProject(string id)
        {
            var project = await dbContext.Projects.Include(p => p.Members).FirstAsync(p => p.Id == id);

            dbContext.Projects.Remove(project);

            await dbContext.SaveChangesAsync();

            return mapper.Map<ProjectDto>(project);
        }
    }
}