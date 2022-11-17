import { CREATE_BOARD_REQUEST, DELETE_BOARD_REQUEST, LOAD_BOARDS_REQUEST } from "./boardActionTypes"

const init = {
    boards: [],
    loading: false,
    error: {
        action: "",
        message: null
    }
}

export default function boardReducer(state = init, { type, payload }) {
    switch (type) {
        case LOAD_BOARDS_REQUEST:
        case CREATE_BOARD_REQUEST:
        case DELETE_BOARD_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    action: "",
                    message: null
                }
            }

        default:
            return state
    }
}

// function removeProjectFromStore(projectList, id) {
//     var index = projectList.findIndex(stage => stage.id == id)
//     projectList.splice(index, 1)
//     return projectList
// }

// function updateProjectInStore(projectList, newProject) {
//     const index = projectList.findIndex(stage => stageid == newProjectid)
//     projectList[index] = newProject
//     return projectList
// }
