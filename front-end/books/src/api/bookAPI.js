import axiosClient from "./axiosClient";

export const getBooks = () => {
    return axiosClient.get("library/");
};

export const addBook = (data) => {
    return axiosClient.post("library/", data);
};

export const updateBook = (id, data) => {
    return axiosClient.put(`update/${id}/`, data);
};

export const deleteBook = (id) => {
    return axiosClient.delete(`delete/${id}/`);
};
