import { put } from "redux-saga/effects";
import { CREATE_BOARD_FAILURE, CREATE_BOARD_SUCCESS, CREATE_CARD_FAILURE, CREATE_CARD_SUCCESS, DELETE_BOARD_FAILURE, DELETE_BOARD_SUCCESS, DELETE_CARD_FAILURE, DELETE_CARD_SUCCESS, LOAD_BOARDS_FAILURE, LOAD_BOARDS_SUCCESS, LOAD_CARD_FAILURE, LOAD_CARD_SUCCESS, UPDATE_CARD_FAILURE, UPDATE_CARD_SUCCESS } from "./boardActionTypes";


export function* loadBoards({ payload }) {
    try {
        yield put({
            type: LOAD_BOARDS_SUCCESS,
            payload: payload
        })
    } catch (error) {
        yield put({
            type: LOAD_BOARDS_FAILURE,
            payload: error
        })
    }
}

export function* removeBoard({ payload }) {
    try {

        yield put({
            type: DELETE_BOARD_SUCCESS,
            payload: payload
        })
    } catch (error) {
        yield put({
            type: DELETE_BOARD_FAILURE,
            payload: error
        })
    }
}


export function* createBoard({ payload }) {
    try {

        yield put({
            type: CREATE_BOARD_SUCCESS,
            payload: payload
        })
    } catch (error) {
        yield put({
            type: CREATE_BOARD_FAILURE,
            payload: error
        })
    }
}

export function* loadCards({ payload }) {
    try {

        yield put({
            type: LOAD_CARD_SUCCESS,
            payload: payload
        })
    } catch (error) {
        yield put({
            type: LOAD_CARD_FAILURE,
            payload: error
        })
    }
}

export function* updateCard({ payload }) {
    try {

        yield put({
            type: UPDATE_CARD_SUCCESS,
            payload: payload
        })
    } catch (error) {
        yield put({
            type: UPDATE_CARD_FAILURE,
            payload: error
        })
    }
}

export function* createCard({ payload }) {
    try {

        yield put({
            type: CREATE_CARD_SUCCESS,
            payload: payload
        })
    } catch (error) {
        yield put({
            type: CREATE_CARD_FAILURE,
            payload: error
        })
    }
}

export function* deleteCard({ payload }) {
    try {

        yield put({
            type: DELETE_CARD_SUCCESS,
            payload: payload
        })
    } catch (error) {
        yield put({
            type: DELETE_CARD_FAILURE,
            payload: error
        })
    }
}