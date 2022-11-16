import { all } from "redux-saga/effects";
import watchBoardAction from "./reducer/board/boardSaga";
import watchProjectAction from "./reducer/project/projectSaga";
import watchStageAction from "./reducer/stage/stageSaga";
import watchUserAction from "./reducer/user/userSaga";
import watchConfirmAction from "./reducer/confirm/confirmSaga"

export default function* rootSaga() {
    yield all([watchUserAction(), watchConfirmAction(), watchProjectAction(), watchStageAction(), watchBoardAction()])
}