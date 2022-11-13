import { takeLatest } from "redux-saga/effects";
import { CREATE_BOARD_REQUEST, CREATE_CARD_REQUEST, DELETE_BOARD_REQUEST, DELETE_CARD_REQUEST, LOAD_BOARDS_REQUEST, LOAD_CARD_REQUEST, UPDATE_CARD_REQUEST } from "./boardActionTypes";
import { createBoard, createCard, deleteCard, loadBoards, loadCards, removeBoard, updateCard } from "./boardActions";

export default function* watchBoardAction() {
    yield takeLatest(LOAD_BOARDS_REQUEST, loadBoards)
    yield takeLatest(CREATE_BOARD_REQUEST, createBoard)
    yield takeLatest(DELETE_BOARD_REQUEST, removeBoard)

    yield takeLatest(LOAD_CARD_REQUEST, loadCards)
    yield takeLatest(CREATE_CARD_REQUEST, createCard)
    yield takeLatest(UPDATE_CARD_REQUEST, updateCard)
    yield takeLatest(DELETE_CARD_REQUEST, deleteCard)
}