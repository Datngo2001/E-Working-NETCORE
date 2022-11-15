import { takeLatest } from "redux-saga/effects";
import { CREATE_PROJECT_REQUEST, DELETE_PROJECT_REQUEST, LOAD_PROJECT_MEMBERS_REQUEST, LOAD_PROJECT_REQUEST, MY_PROJECT_REQUEST, UPDATE_PROJECT_REQUEST } from "./projectActionTypes";
import { createProject, editProject, getMyProject, loadProject, loadProjectMember, removeProject } from './projectActions'

export default function* watchProjectAction() {
    yield takeLatest(CREATE_PROJECT_REQUEST, createProject)
    yield takeLatest(MY_PROJECT_REQUEST, getMyProject)
    yield takeLatest(LOAD_PROJECT_REQUEST, loadProject)
    yield takeLatest(UPDATE_PROJECT_REQUEST, editProject)
    yield takeLatest(LOAD_PROJECT_MEMBERS_REQUEST, loadProjectMember)
    yield takeLatest(DELETE_PROJECT_REQUEST, removeProject)
}