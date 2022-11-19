import { put } from "redux-saga/effects";
import { CREATE_CARD_FAILURE, CREATE_CARD_SUCCESS, CREATE_COLUMN_FAILURE, CREATE_COLUMN_SUCCESS, DELETE_CARD_FAILURE, DELETE_CARD_SUCCESS, DELETE_COLUMN_FAILURE, DELETE_COLUMN_SUCCESS, LOAD_BOARD_FAILURE, LOAD_BOARD_SUCCESS, UPDATE_CARD_FAILURE, UPDATE_CARD_SUCCESS, UPDATE_COLUMN_FAILURE, UPDATE_COLUMN_SUCCESS } from "./boardActionTypes";
import { getBoard, postCard, postColumn, putColumn } from "../../../api/board";

export function* loadBoard({ payload }) {
    try {
        let board = yield getBoard(payload.projectId);
        yield put({
            type: LOAD_BOARD_SUCCESS,
            payload: board
        })
    } catch (error) {
        yield put({
            type: LOAD_BOARD_FAILURE,
            payload: error
        })
    }
}

export function* createColumn({ payload }) {
    try {
        let column = yield postColumn(payload.projectId, payload.data);
        yield put({
            type: CREATE_COLUMN_SUCCESS,
            payload: column
        })
    } catch (error) {
        yield put({
            type: CREATE_COLUMN_FAILURE,
            payload: error
        })
    }
}

export function* createCard({ payload }) {
    try {
        let card = yield postCard(payload.projectId, payload.data);
        yield put({
            type: CREATE_CARD_SUCCESS,
            payload: card
        })
    } catch (error) {
        yield put({
            type: CREATE_CARD_FAILURE,
            payload: error
        })
    }
}

export function* updateColumn({ payload }) {
    try {
        let column = yield putColumn(payload.projectId, payload.columnId, payload.data);
        yield put({
            type: UPDATE_COLUMN_SUCCESS,
            payload: column
        })
    } catch (error) {
        yield put({
            type: UPDATE_COLUMN_FAILURE,
            payload: error
        })
    }
}

export function* updateCard({ payload }) {
    try {
        let card = yield putColumn(payload.projectId, payload.columnId, payload.data);
        yield put({
            type: UPDATE_CARD_SUCCESS,
            payload: card
        })
    } catch (error) {
        yield put({
            type: UPDATE_CARD_FAILURE,
            payload: error
        })
    }
}

export function* deleteColumn({ payload }) {
    try {
        let column = yield deleteColumn(payload.projectId, payload.columnId);
        yield put({
            type: DELETE_COLUMN_SUCCESS,
            payload: column
        })
    } catch (error) {
        yield put({
            type: DELETE_COLUMN_FAILURE,
            payload: error
        })
    }
}

export function* deleteCard({ payload }) {
    try {
        let card = yield deleteCard(payload.projectId, payload.columnId);
        yield put({
            type: DELETE_CARD_SUCCESS,
            payload: card
        })
    } catch (error) {
        yield put({
            type: DELETE_CARD_FAILURE,
            payload: error
        })
    }
}