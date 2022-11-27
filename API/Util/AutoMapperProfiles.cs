
using DataAccess.Entities;
using AutoMapper;
using CommonModel.Project;
using CommonModel.Stage;
using CommonModel.Board;
using CommonModel.Board.Column;
using CommonModel.Board.Card;
using CommonModel.User;

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

            //Board
            CreateMap<Board, BoardDto>();
            CreateMap<Column, ColumnDto>();
            CreateMap<Card, CardDto>();
            CreateMap<CreateColumnDto, Column>();
            CreateMap<UpdateColumnDto, Column>();
            CreateMap<CreateCardDto, Card>();
            CreateMap<UpdateCardDto, Card>();

            //User 
            CreateMap<AppUser, AppUserDto>();
        }
    }
}