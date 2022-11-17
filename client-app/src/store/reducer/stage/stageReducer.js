import { DELETE_STAGE_REQUEST, DELETE_STAGE_SUCCESS, DELETE_STAGE_FAILURE, CLEAR_STAGES, CREATE_STAGE_FAILURE, CREATE_STAGE_REQUEST, CREATE_STAGE_SUCCESS, LOAD_STAGE_FAILURE, LOAD_STAGE_REQUEST, LOAD_STAGE_SUCCESS, STAGE_ENDDATE_UPDATE_FAILURE, STAGE_ENDDATE_UPDATE_REQUEST, STAGE_ENDDATE_UPDATE_SUCCESS, STAGE_STARTDATE_UPDATE_FAILURE, STAGE_STARTDATE_UPDATE_REQUEST, STAGE_STARTDATE_UPDATE_SUCCESS, UPDATE_STAGE_NAME_REQUEST, UPDATE_STAGE_NAME_FAILURE, UPDATE_STAGE_NAME_SUCCESS, SET_CURRENT_STAGE, CLEAR_CURRENT_STAGE } from "./stageActionTypes"

const init = {
    ganttChart: {
        mode: 'week',
        startColumnAt: 2,
        dateRowAt: 1,
        stageRowAt: 3,
        startDate: null,
        endDate: null,
        totalDate: null
    },
    stages: [],
    currentStage: null,
    loading: false,
    error: {
        action: "",
        message: null
    }
}

export default function stageReducer(state = init, { type, payload }) {
    switch (type) {
        case LOAD_STAGE_REQUEST:
            return {
                ...state,
                stages: [],
                currentStage: null,
                loading: true,
                error: {
                    action: "",
                    message: null
                }
            }
        case CREATE_STAGE_REQUEST:
        case DELETE_STAGE_REQUEST:
        case UPDATE_STAGE_NAME_REQUEST:
        case STAGE_STARTDATE_UPDATE_REQUEST:
        case STAGE_ENDDATE_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    action: "",
                    message: null
                }
            }
        case LOAD_STAGE_FAILURE:
        case CREATE_STAGE_FAILURE:
        case DELETE_STAGE_FAILURE:
        case UPDATE_STAGE_NAME_FAILURE:
        case STAGE_STARTDATE_UPDATE_FAILURE:
        case STAGE_ENDDATE_UPDATE_FAILURE:
            return {
                ...state,
                currentStage: null,
                loading: false,
                error: {
                    action: type,
                    message: payload
                }
            }
        case LOAD_STAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                stages: payload.stages,
                ganttChart: {
                    ...state.ganttChart,
                    startDate: payload.ganttChart.startDate,
                    endDate: payload.ganttChart.endDate,
                    totalDate: payload.ganttChart.totalDate,
                },
                currentStage: null,
                error: {
                    action: "",
                    message: null
                }
            }
        case UPDATE_STAGE_NAME_SUCCESS:
        case STAGE_STARTDATE_UPDATE_SUCCESS:
        case STAGE_ENDDATE_UPDATE_SUCCESS:
            return {
                ...state,
                stages: updateStageInStore(state.stages, payload),
                error: {
                    action: "",
                    message: null
                }
            }
        case CREATE_STAGE_SUCCESS:
            return {
                ...state,
                stages: addStageToStore(state.stages, payload),
                error: {
                    action: "",
                    message: null
                }
            }
        case DELETE_STAGE_SUCCESS:
            return {
                ...state,
                stages: removeStageFromStore(state.stages, payload),
                error: {
                    action: "",
                    message: null
                }
            }
        case CLEAR_STAGES:
            return { ...init }
        case SET_CURRENT_STAGE:
            return {
                ...state,
                currentStage: payload
            }
        case CLEAR_CURRENT_STAGE:
            return {
                ...state,
                currentStage: null
            }
        default:
            return state
    }
}

function updateStageInStore(stages, newStage) {
    const index = stages.findIndex(stage => stage.id == newStage.id)
    stages[index] = newStage
    return stages
}

function addStageToStore(stages, newStage) {
    stages.push(newStage)
    return stages
}

function removeStageFromStore(stages, id) {
    var index = stages.findIndex(stage => stage.id == id)
    stages.splice(index, 1)
    return stages
}