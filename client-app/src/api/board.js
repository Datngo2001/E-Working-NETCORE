import api from "./";

export function getBoard(projectId) {
    return api.get(`board/project/${projectId}`)
}

export function getBoardByStage(projectId, stageId) {
    return api.get(`board/project/${projectId}/stage/${stageId}`)
}

export function postColumn(projectId, data) {
    return api.post(`board/project/${projectId}/create-column`, data)
}

export function postCard(projectId, data) {
    return api.post(`board/project/${projectId}/create-card`, data)
}

export function putColumn(projectId, columnId, data) {
    return api.post(`board/project/${projectId}/update-column/${columnId}`, data)
}

export function putCard(projectId, cardId, data) {
    return api.put(`board/project/${projectId}/update-card/${cardId}`, data)
}

export function deleteColumn(projectId, columnId) {
    return api.delete(`board/project/${projectId}/delete-column/${columnId}`)
}

export function deleteCard(projectId, cardId) {
    return api.delete(`board/project/${projectId}/delete-card/${cardId}`)
}
