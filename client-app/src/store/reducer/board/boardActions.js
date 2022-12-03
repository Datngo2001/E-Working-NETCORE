import { put } from "redux-saga/effects";
import { CREATE_CARD_FAILURE, CREATE_CARD_SUCCESS, CREATE_COLUMN_FAILURE, CREATE_COLUMN_SUCCESS, DELETE_CARD_FAILURE, DELETE_CARD_SUCCESS, DELETE_COLUMN_FAILURE, DELETE_COLUMN_SUCCESS, GET_CARD_FAILURE, GET_CARD_SUCCESS, LOAD_BOARD_FAILURE, LOAD_BOARD_SUCCESS, MOVE_CARD_FAILURE, MOVE_CARD_SUCCESS, UPDATE_CARD_FAILURE, UPDATE_CARD_SUCCESS, UPDATE_COLUMN_FAILURE, UPDATE_COLUMN_SUCCESS } from "./boardActionTypes";
import { deleteCard, deleteColumn, getBoardByStage, getCards, moveCard, postCard, postColumn, putCard, putColumn } from "../../../api/board";

export function* loadBoard({ payload }) {
    try {
        let res = yield getBoardByStage(payload.projectId, payload.stageId);
        let board = res.data
        board.columns.forEach(col => {
            col.card = []
        });
        yield put({
            type: LOAD_BOARD_SUCCESS,
            payload: res.data
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
        let res = yield postColumn(payload.projectId, payload.data);
        yield put({
            type: CREATE_COLUMN_SUCCESS,
            payload: res.data
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
        let res = yield postCard(payload.projectId, payload.data);
        yield put({
            type: CREATE_CARD_SUCCESS,
            payload: res.data
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
        let res = yield putColumn(payload.projectId, payload.columnId, payload.data);
        yield put({
            type: UPDATE_COLUMN_SUCCESS,
            payload: res.data
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
        let res = yield putCard(payload.projectId, payload.cardId, payload.data);
        yield put({
            type: UPDATE_CARD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({
            type: UPDATE_CARD_FAILURE,
            payload: error
        })
    }
}

export function* removeColumn({ payload }) {
    try {
        let res = yield deleteColumn(payload.projectId, payload.columnId);
        yield put({
            type: DELETE_COLUMN_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({
            type: DELETE_COLUMN_FAILURE,
            payload: error
        })
    }
}

export function* removeCard({ payload }) {
    try {
        let res = yield deleteCard(payload.projectId, payload.cardId);
        yield put({
            type: DELETE_CARD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({
            type: DELETE_CARD_FAILURE,
            payload: error
        })
    }
}

export function* handleMoveCard({ payload }) {
    try {
        let res = yield moveCard(payload.projectId, payload.data);
        yield put({
            type: MOVE_CARD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({
            type: MOVE_CARD_FAILURE,
            payload: error
        })
    }
}

export function* handleGetCards({ payload }) {
    try {
        let res = yield getCards(payload.projectId, payload.columnId, payload.stageId);
        debugger
        yield put({
            type: GET_CARD_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({
            type: GET_CARD_FAILURE,
            payload: error
        })
    }
}