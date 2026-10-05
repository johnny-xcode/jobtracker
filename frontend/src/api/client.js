import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const getJobs = (params) => api.get("/jobs", { params }).then((r) => r.data);
export const getStats = () => api.get("/jobs/stats").then((r) => r.data);
export const createJob = (data) => api.post("/jobs", data).then((r) => r.data);
export const extractJob = (link) => api.post("/jobs/extract", { link }).then((r) => r.data);
export const addJobFromLink = (link) => api.post("/jobs/from-link", { link }).then((r) => r.data);
export const updateJob = (id, data) => api.put(`/jobs/${id}`, data).then((r) => r.data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`).then((r) => r.data);

export default api;