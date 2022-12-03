import { takeEvery, takeLatest } from "redux-saga/effects";
import { CREATE_CARD_REQUEST, CREATE_COLUMN_REQUEST, DELETE_CARD_REQUEST, DELETE_COLUMN_REQUEST, GET_CARD_REQUEST, LOAD_BOARD_REQUEST, MOVE_CARD_REQUEST, UPDATE_CARD_REQUEST, UPDATE_COLUMN_REQUEST } from "./boardActionTypes";
import { createCard, createColumn, removeColumn, loadBoard, updateCard, updateColumn, removeCard, handleMoveCard, handleGetCards } from "./boardActions";

export default function* watchBoardAction() {
    yield takeLatest(LOAD_BOARD_REQUEST, loadBoard)
    yield takeLatest(CREATE_CARD_REQUEST, createCard)
    yield takeLatest(CREATE_COLUMN_REQUEST, createColumn)
    yield takeLatest(UPDATE_COLUMN_REQUEST, updateColumn)
    yield takeLatest(UPDATE_CARD_REQUEST, updateCard)
    yield takeLatest(DELETE_CARD_REQUEST, removeCard)
    yield takeLatest(DELETE_COLUMN_REQUEST, removeColumn)
    yield takeLatest(MOVE_CARD_REQUEST, handleMoveCard)
    yield takeEvery(GET_CARD_REQUEST, handleGetCards)
}