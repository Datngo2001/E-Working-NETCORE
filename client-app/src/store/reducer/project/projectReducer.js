import { CREATE_PROJECT_FAILURE, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, LOAD_PROJECT_FAILURE, LOAD_PROJECT_MEMBERS_FAILURE, LOAD_PROJECT_MEMBERS_REQUEST, LOAD_PROJECT_MEMBERS_SUCCESS, LOAD_PROJECT_REQUEST, LOAD_PROJECT_SUCCESS, MY_PROJECT_FAILURE, MY_PROJECT_REQUEST, MY_PROJECT_SUCCESS, SET_CURRENT_PROJECT, UPDATE_MEMBERS_FAILURE, UPDATE_MEMBERS_REQUEST, UPDATE_MEMBERS_SUCCESS, UPDATE_PROJECT_FAILURE, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS } from "./projectActionTypes";

const init = {
    projectList: [],
    members: [],
    currentProject: null,
    loading: false,
    error: {
        action: "",
        message: null
    }
}

export default function projectReducer(state = init, { type, payload }) {
    switch (type) {
        case LOAD_PROJECT_MEMBERS_REQUEST:
        case UPDATE_PROJECT_REQUEST:
        case LOAD_PROJECT_REQUEST:
        case CREATE_PROJECT_REQUEST:
        case MY_PROJECT_REQUEST:
        case DELETE_PROJECT_REQUEST:
        case UPDATE_MEMBERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: {
                    action: "",
                    message: null
                }
            }
        case LOAD_PROJECT_MEMBERS_FAILURE:
        case UPDATE_PROJECT_FAILURE:
        case LOAD_PROJECT_FAILURE:
        case CREATE_PROJECT_FAILURE:
        case MY_PROJECT_FAILURE:
        case DELETE_PROJECT_FAILURE:
        case UPDATE_MEMBERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    action: type,
                    message: payload
                }
            }
        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                currentProject: payload,
                projectList: [...state.projectList, payload],
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }
        case MY_PROJECT_SUCCESS:
            return {
                ...state,
                projectList: payload,
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }
        case LOAD_PROJECT_SUCCESS:
            return {
                ...state,
                currentProject: payload,
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }
        case UPDATE_MEMBERS_SUCCESS:
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                currentProject: payload,
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }
        case LOAD_PROJECT_MEMBERS_SUCCESS:
            return {
                ...state,
                members: payload,
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                projectList: removeProjectFromStore(state.projectList, payload),
                currentProject: null,
                members: null,
                loading: false,
                error: {
                    action: "",
                    message: null
                }
            }
        case SET_CURRENT_PROJECT:
            return {
                ...state,
                currentProject: state.projectList.find(proj => proj.id, payload),
            }
        default:
            return state
    }
}

function removeProjectFromStore(projectList, id) {
    var index = projectList.findIndex(stage => stage.id === id)
    projectList.splice(index, 1)
    return projectList
}

// function updateProjectInStore(projectList, newProject) {
//     const index = projectList.findIndex(stage => stageid == newProjectid)
//     projectList[index] = newProject
//     return projectList
// }
