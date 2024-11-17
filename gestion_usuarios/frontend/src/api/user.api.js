import axios from 'axios';

//Endpoints

const userApi = axios.create({
    baseURL: "http://localhost:8000/app/api/v1/app/",
});

export const getAllUsers = () => userApi.get("/");

export const getUser = (id) => userApi.get(`/${id}/`);

export const createUser = (user) => userApi.post("/", user);

export const deleteUser = (id) => userApi.delete(`/${id}/`);

export const updateUser = (id, user) => userApi.put(`/${id}/`, user);
