import api from "./";

export function getBoard(projectId) {
    return api.get(`stage/project/${projectId}/all`)
}

export function updateStageName(projectId, id, name) {
    return api.patch(`stage/${id}/project/${projectId}/name`, { name: name })
}

export function updateStartDate(projectId, id, date) {
    return api.patch(`stage/${id}/project/${projectId}/start-date`, { startDate: date })
}

export function updateEndDate(projectId, id, date) {
    return api.patch(`stage/${id}/project/${projectId}/end-date`, { endDate: date })
}

export function createStage(projectId, data) {
    return api.post(`stage/project/${projectId}`, data)
}

export function deleteStage(projectId, id) {
    return api.delete(`stage/${id}/project/${projectId}`)
}