import { combineReducers } from 'redux'
import userReducer from './reducer/user/userReducer'
import projectReducer from './reducer/project/projectReducer'
import stageReducer from './reducer/stage/stageReducer'
import boardReducer from './reducer/board/boardReducer'

export default combineReducers({
    user: userReducer,
    project: projectReducer,
    stage: stageReducer,
    board: boardReducer,
})