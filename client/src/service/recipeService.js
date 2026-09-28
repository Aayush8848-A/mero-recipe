import { publicApi, protectedApi } from "./api";

export const recipeService = {
  getAll: (params) => publicApi.get("recipes", { params }),
  getFeatured: () => publicApi.get("/recipes/featured"),
  getById: (id) => publicApi.get(`recipes/${id}`),
  search: async (params) => {
    return await publicApi.get("/recipes/search", { params });
  },
  getAllAdmin: (params) => protectedApi.get("/recipes/admin", { params }),
  create: (formData) => protectedApi.post("/recipes", formData),
  update: (id, formData) => protectedApi.put(`/recipes/${id}`, formData),
  remove: (id) => protectedApi.delete(`/recipes/${id}`),

  togglePublish: (id) => protectedApi.patch(`/recipes/${id}/publish`),
  toggleFeatured: (id) => protectedApi.patch(`/recipes/${id}/featured`),
};
