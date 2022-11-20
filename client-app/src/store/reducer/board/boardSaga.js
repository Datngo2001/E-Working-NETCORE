import { takeLatest } from "redux-saga/effects";
import { CREATE_CARD_REQUEST, CREATE_COLUMN_REQUEST, DELETE_CARD_REQUEST, DELETE_COLUMN_REQUEST, LOAD_BOARD_REQUEST, UPDATE_CARD_REQUEST, UPDATE_COLUMN_REQUEST } from "./boardActionTypes";
import { createCard, createColumn, deleteCard, removeColumn, loadBoard, updateCard, updateColumn } from "./boardActions";

export default function* watchBoardAction() {
    yield takeLatest(LOAD_BOARD_REQUEST, loadBoard)
    yield takeLatest(CREATE_CARD_REQUEST, createCard)
    yield takeLatest(CREATE_COLUMN_REQUEST, createColumn)
    yield takeLatest(UPDATE_COLUMN_REQUEST, updateCard)
    yield takeLatest(UPDATE_CARD_REQUEST, updateColumn)
    yield takeLatest(DELETE_CARD_REQUEST, deleteCard)
    yield takeLatest(DELETE_COLUMN_REQUEST, removeColumn)
}