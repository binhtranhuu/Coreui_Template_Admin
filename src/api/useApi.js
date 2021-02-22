import axiosClient from "./axiosClient";

const userApi = {
    login: (payload) => {
        const url = "/auth/login";
        return axiosClient.post(url, payload);
    },
    logout: (payload) => {
        const url = '/auth/logout';
        return axiosClient.get(url, payload)
    },
    register: (payload) => {
        const url = 'auth/signup';
        return axiosClient.post(url, payload);
    }
}

export default userApi;