import api from "./";

export function postProject(data) {
    return api.post("/project", data)
}

export function getMyProject() {
    return api.get("/project/my/all")
}

export function getProjectById(id) {
    return api.get(`/project/${id}`)
}

export function getProjectMember(id) {
    return api.get(`/project/${id}/members`)
}

export function putProject(id, data) {
    return api.put(`/project/${id}`, data)
}

export function putProjectMembers(id, data) {
    return api.put(`/project/${id}/members`, data)
}

export function deleteProject(id) {
    return api.delete(`/project/${id}`)
}