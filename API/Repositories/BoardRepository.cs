using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using CommonModel.Board;
using CommonModel.Board.Card;
using CommonModel.Board.Column;
using DataAccess;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Column = DataAccess.Entities.Column;

namespace API.Repositories
{
    public class BoardRepository : IBoardRepository
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IMapper mapper;

        public BoardRepository(ApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<BoardDto> GetBoardWithColumnByProject(string projectId, string stageId)
        {
            if (stageId == string.Empty)
            {
                var temp = await dbContext.Boards
                .Include(b => b.Project)
                .Include(b => b.Columns)
                .Where(b => b.ProjectId == projectId)
                .ProjectTo<BoardDto>(mapper.ConfigurationProvider)
                .FirstAsync();

                temp.Columns.Sort(delegate (ColumnDto a, ColumnDto b)
                {
                    if (a.CreateDate > b.CreateDate)
                    {
                        return 1;
                    }
                    else if (a.CreateDate < b.CreateDate)
                    {
                        return -1;
                    }
                    return 0;
                });

                return temp;
            }

            var board = await dbContext.Boards
                .Include(b => b.Project)
                .Include(b => b.Columns)
                .ThenInclude(c => c.Cards.Where(c => c.StageId == stageId))
                .Where(b => b.ProjectId == projectId)
                .ProjectTo<BoardDto>(mapper.ConfigurationProvider)
                .FirstAsync();

            board.Columns.Sort(delegate (ColumnDto a, ColumnDto b)
            {
                if (a.CreateDate > b.CreateDate)
                {
                    return 1;
                }
                else if (a.CreateDate < b.CreateDate)
                {
                    return -1;
                }
                return 0;
            });

            board.StageId = stageId;
            return board;
        }

        public async Task<ColumnDto> CreateBoardColumn(string projectId, string userId, CreateColumnDto createColumnDto)
        {
            var newColumn = new Column();
            newColumn.Id = Guid.NewGuid().ToString();
            newColumn.CreatorId = userId;
            newColumn.CreateDate = DateTime.Now;

            mapper.Map(createColumnDto, newColumn);

            var boardId = await dbContext.Boards.Where(b => b.ProjectId == projectId).Select(b => b.Id).FirstAsync();
            newColumn.BoardId = boardId;

            dbContext.Columns.Add(newColumn);

            await dbContext.SaveChangesAsync();

            return mapper.Map<ColumnDto>(newColumn);
        }

        public async Task<CardDto> CreateCard(string projectId, string userId, CreateCardDto createCardDto)
        {
            var newCard = new Card();
            newCard.Id = Guid.NewGuid().ToString();
            newCard.ProjectId = projectId;
            newCard.CreatorId = userId;
            newCard.CreateDate = DateTime.Now;

            mapper.Map(createCardDto, newCard);

            dbContext.Cards.Add(newCard);

            await dbContext.SaveChangesAsync();

            return mapper.Map<CardDto>(newCard);
        }

        public async Task<ColumnDto> UpdateBoardColumn(string columnId, UpdateColumnDto updateColumnDto)
        {
            var column = await dbContext.Columns.FirstAsync(c => c.Id == columnId);
            mapper.Map(updateColumnDto, column);

            await dbContext.SaveChangesAsync();

            return mapper.Map<ColumnDto>(column);
        }

        public async Task<CardDto> UpdateCard(string cardId, UpdateCardDto updateCardDto)
        {
            var card = await dbContext.Cards.FirstAsync(c => c.Id == cardId);
            mapper.Map(updateCardDto, card);

            await dbContext.SaveChangesAsync();

            return mapper.Map<CardDto>(card);
        }

        public async Task<CardDto> MoveCard(MoveCardDto moveCardDto)
        {
            var card = await dbContext.Cards.FirstAsync(c => c.Id == moveCardDto.CardId);
            var startColumn = await dbContext.Columns.FirstAsync(c => c.Id == moveCardDto.StartColumn);
            var endColumn = await dbContext.Columns.FirstAsync(c => c.Id == moveCardDto.EndColumn);

            card.Column = endColumn;

            await dbContext.SaveChangesAsync();

            return mapper.Map<CardDto>(card);
        }

        public async Task<ColumnDto> DeleteBoardColumn(string columnId)
        {
            var column = await dbContext.Columns.FirstAsync(c => c.Id == columnId);

            dbContext.Columns.Remove(column);

            await dbContext.SaveChangesAsync();

            return mapper.Map<ColumnDto>(column);
        }

        public async Task<CardDto> DeleteCard(string cardId)
        {
            var card = await dbContext.Cards.FirstAsync(c => c.Id == cardId);

            dbContext.Cards.Remove(card);

            await dbContext.SaveChangesAsync();

            return mapper.Map<CardDto>(card);
        }
    }
}
