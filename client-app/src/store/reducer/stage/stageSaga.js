import { takeEvery, takeLatest } from 'redux-saga/effects'
import { createNewStage, editStageName, loadAllProjectStage, removeStage, updateStageEndDate, updateStageStartDate } from './stageActions'
import { CREATE_STAGE_REQUEST, LOAD_STAGE_REQUEST, STAGE_ENDDATE_UPDATE_REQUEST, STAGE_STARTDATE_UPDATE_REQUEST, DELETE_STAGE_REQUEST, UPDATE_STAGE_NAME_REQUEST } from './stageActionTypes'

export default function* watchStageAction() {
    yield takeLatest(LOAD_STAGE_REQUEST, loadAllProjectStage)
    yield takeEvery(STAGE_STARTDATE_UPDATE_REQUEST, updateStageStartDate)
    yield takeEvery(STAGE_ENDDATE_UPDATE_REQUEST, updateStageEndDate)
    yield takeLatest(CREATE_STAGE_REQUEST, createNewStage)
    yield takeLatest(DELETE_STAGE_REQUEST, removeStage)
    yield takeLatest(UPDATE_STAGE_NAME_REQUEST, editStageName)
}