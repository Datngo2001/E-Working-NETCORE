import { DELETE_STAGE_SUCCESS, DELETE_STAGE_FAILURE, CREATE_STAGE_FAILURE, CREATE_STAGE_SUCCESS, LOAD_STAGE_FAILURE, LOAD_STAGE_SUCCESS, STAGE_ENDDATE_UPDATE_FAILURE, STAGE_ENDDATE_UPDATE_SUCCESS, STAGE_STARTDATE_UPDATE_FAILURE, STAGE_STARTDATE_UPDATE_SUCCESS, UPDATE_STAGE_NAME_SUCCESS, UPDATE_STAGE_NAME_FAILURE } from "./stageActionTypes"
import { createStage, deleteStage, getAllProjectStage, updateEndDate, updateStageName, updateStartDate } from '../../../api/stage'
import { call, put } from "redux-saga/effects"
import { dateDiffInDays } from "../../../util/date"

export function* loadAllProjectStage({ payload }) {
    try {
        const res = yield call(getAllProjectStage, payload)

        const stages = res.data.map(stage => {
            stage.startDate = new Date(stage.startDate);
            stage.endDate = new Date(stage.endDate);
            return stage
        })

        let startDate = stages[0]?.startDate;
        stages.forEach((stage) => {
            if (stage.startDate < startDate) {
                startDate = stage.startDate;
            }
        });

        let endDate = stages[0]?.endDate;
        stages.forEach((stage) => {
            if (stage.endDate > endDate) {
                endDate = stage.endDate;
            }
        });

        if (stages.length === 0) {
            startDate = new Date()
            endDate = new Date()
        } else {
            startDate = new Date(startDate)
            endDate = new Date(endDate)
        }

        startDate.setFullYear(startDate.getFullYear() - 1)
        endDate.setFullYear(endDate.getFullYear() + 1)

        while (startDate.getDay() !== 1) {
            startDate.setDate(startDate.getDate() - 1);
        }

        while (endDate.getDay() !== 0) {
            endDate.setDate(endDate.getDate() + 1);
        }

        let totalDate = dateDiffInDays(endDate, startDate)

        yield put({
            type: LOAD_STAGE_SUCCESS,
            payload: { stages, ganttChart: { startDate, endDate, totalDate } }
        })
    } catch (error) {
        yield put({
            type: LOAD_STAGE_FAILURE,
            payload: error
        })
    }
}

export function* updateStageStartDate({ payload }) {
    try {
        const res = yield call(updateStartDate, payload.projectId, payload.id, payload.date)

        yield put({
            type: STAGE_STARTDATE_UPDATE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({
            type: STAGE_STARTDATE_UPDATE_FAILURE,
            payload: error
        })
    }
}

export function* updateStageEndDate({ payload }) {
    try {
        const res = yield call(updateEndDate, payload.projectId, payload.id, payload.date)

        yield put({
            type: STAGE_ENDDATE_UPDATE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({
            type: STAGE_ENDDATE_UPDATE_FAILURE,
            payload: error
        })
    }
}

export function* createNewStage({ payload }) {
    try {
        const res = yield call(createStage, payload.projectId, payload.data)

        var stage = res.data
        stage.startDate = new Date(stage.startDate)
        stage.endDate = new Date(stage.endDate)

        yield put({
            type: CREATE_STAGE_SUCCESS,
            payload: stage
        })
    } catch (error) {
        yield put({
            type: CREATE_STAGE_FAILURE,
            payload: error
        })
    }
}

export function* removeStage({ payload }) {
    try {
        yield call(deleteStage, payload.projectId, payload.id)

        yield put({
            type: DELETE_STAGE_SUCCESS,
            payload: payload
        })
    } catch (error) {
        yield put({
            type: DELETE_STAGE_FAILURE,
            payload: error
        })
    }
}

export function* editStageName({ payload }) {
    try {
        var res = yield call(updateStageName, payload.projectId, payload.id, payload.name)

        yield put({
            type: UPDATE_STAGE_NAME_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        yield put({
            type: UPDATE_STAGE_NAME_FAILURE,
            payload: error
        })
    }
}
