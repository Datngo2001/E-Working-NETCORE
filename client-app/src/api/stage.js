import api from "./";

export function getAllProjectStage(projectId) {
    return api.get(`stage/project/${projectId}/all`)
}

export function updateStageName(projectId, id, name) {
    return api.put(`stage/project/${projectId}/${id}`, { name: name })
}

export function updateStartDate(projectId, id, date) {
    return api.put(`stage/project/${projectId}/${id}`, { startDate: date })
}

export function updateEndDate(projectId, id, date) {
    return api.put(`stage/project/${projectId}/${id}`, { endDate: date })
}

export function createStage(projectId, data) {
    return api.post(`stage/project/${projectId}`, data)
}

export function deleteStage(projectId, id) {
    return api.delete(`stage/project/${projectId}/${id}`)
}