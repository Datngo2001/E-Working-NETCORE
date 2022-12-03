using API.Interfaces;
using API.Repositories;
using CommonModel.Board;
using CommonModel.Board.Card;
using CommonModel.Board.Column;
using CommonModel.Stage;
using DataAccess.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class BoardController : _APIController
    {
        private readonly IBoardRepository boardRepository;
        private readonly UserManager<AppUser> userManager;
        private readonly IStageRepository stageRepository;

        public BoardController(IBoardRepository boardRepository, UserManager<AppUser> userManager, IStageRepository stageRepository)
        {
            this.boardRepository = boardRepository;
            this.userManager = userManager;
            this.stageRepository = stageRepository;
        }

        [HttpGet("project/{projectId}")]
        public async Task<ActionResult<BoardDto>> GetBoard(string projectId)
        {
            var stageId = await stageRepository.GetLastStage();
            return await boardRepository.GetBoardWithColumnByProject(projectId, stageId);
        }

        [HttpGet("project/{projectId}/stage/{stageId}")]
        public async Task<ActionResult<BoardDto>> GetBoardByStage(string projectId, string stageId)
        {
            return await boardRepository.GetBoardWithColumnByProject(projectId, stageId);
        }


        [HttpPost("project/{projectId}/create-column")]
        public async Task<ActionResult<ColumnDto>> CreateColumn(string projectId, [FromBody] CreateColumnDto createColumnDto)
        {
            var userId = userManager.GetUserId(User);
            return await boardRepository.CreateBoardColumn(projectId, userId, createColumnDto);
        }

        [HttpPost("project/{projectId}/create-card")]
        public async Task<ActionResult<CardDto>> CreateCard(string projectId, [FromBody] CreateCardDto createCardDto)
        {
            var userId = userManager.GetUserId(User);
            return await boardRepository.CreateCard(projectId, userId, createCardDto);
        }

        [HttpPut("project/{projectId}/update-column/{columnId}")]
        public async Task<ActionResult<ColumnDto>> UpdateColumn(string columnId, string projectId, [FromBody] UpdateColumnDto updateColumnDto)
        {
            return await boardRepository.UpdateBoardColumn(columnId, updateColumnDto);
        }


        [HttpPut("project/{projectId}/update-card/{cardId}")]
        public async Task<ActionResult<CardDto>> UpdateCard(string cardId, string projectId, [FromBody] UpdateCardDto updateCardDto)
        {
            return await boardRepository.UpdateCard(cardId, updateCardDto);
        }

        [HttpPatch("project/{projectId}/mover-card")]
        public async Task<ActionResult<CardDto>> MoveCard(string projectId, [FromBody] MoveCardDto moveCardDto)
        {
            return await boardRepository.MoveCard(moveCardDto);
        }

        [HttpDelete("project/{projectId}/delete-column/{columnId}")]
        public async Task<ActionResult<ColumnDto>> DeleteColumn(string columnId, string projectId)
        {
            return await boardRepository.DeleteBoardColumn(columnId);
        }


        [HttpDelete("project/{projectId}/delete-card/{cardId}")]
        public async Task<ActionResult<CardDto>> DeleteCard(string cardId, string projectId)
        {
            return await boardRepository.DeleteCard(cardId);
        }

        [HttpGet("project/{projectId}/cards")]
        public async Task<ActionResult<List<CardDto>>> GetCards(string projectId, string columnId, string stageId)
        {
            return await boardRepository.GetCards(projectId, columnId, stageId);
        }
    }
}
