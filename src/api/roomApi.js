import axiosClient from "./axiosClient";

const roomApi = {
    getRoom: (params) => {
        const url = "/room";
        return axiosClient.get(url, { params });
    }
}

export default roomApi;