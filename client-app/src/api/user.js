import api from "./";

export function getProfile(id) {
    return api.get(`user/${id}`);
}

export function putProfile(data) {
    return api.put('user', data)
}

export function register(payload) {
    return api.post("auth/register", payload);
}

export function syncUser(token) {
    return api.post("/user/sync-with-firebase", null, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

export function searchUsers(username) {
    return api.post(`user/search`, {
        page: 1,
        limit: 10,
        query: username
    });
}