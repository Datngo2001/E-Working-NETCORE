using CommonModel.Board;
using CommonModel.Board.Card;
using CommonModel.Board.Column;

namespace API.Interfaces
{
    public interface IBoardRepository
    {
        Task<BoardDto> GetBoardWithColumnByProject(string projectId, string stageId);
        Task<ColumnDto> CreateBoardColumn(string projectId, string userId, CreateColumnDto createColumnDto);
        Task<ColumnDto> UpdateBoardColumn(string columnId, UpdateColumnDto updateColumnDto);
        Task<ColumnDto> DeleteBoardColumn(string columnId);
        Task<List<CardDto>> GetCards(string projectId, string columnId, string stageId);
        Task<CardDto> CreateCard(string projectId, string userId, CreateCardDto createCardDto);
        Task<CardDto> UpdateCard(string cardId, UpdateCardDto updateCardDto);
        Task<CardDto> DeleteCard(string cardId);
        Task<CardDto> MoveCard(MoveCardDto moveCardDto);
    }
}
