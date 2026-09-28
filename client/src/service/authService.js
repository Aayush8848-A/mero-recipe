import { publicApi, protectedApi } from "./api";
export const authService = {
  login: (credentials) => publicApi.post("/auth/login", credentials),
  getProfile: () => protectedApi.get("/auth/me"),
};
