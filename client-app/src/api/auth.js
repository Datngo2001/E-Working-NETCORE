import api from "./";

export function login(payload) {
  return api.post("auth/signin", payload);
}

export function register(payload) {
  return api.post("auth/register", payload);
}

export function verifyIdToken(token) {
  return api.post("auth/verify-google-id-token", { token });
}