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
    }
}