import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: "http://api.thuematbang24h.com/api",
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    //Handle token here...
    const customHeaders = {}

    const accessToken = localStorage.getItem("hms_token");
    if(accessToken) {
        customHeaders.Authorization = accessToken;
    }

    return {
        ...config,
        headers: {
            ...customHeaders,
            ...config.headers,

        }
    }
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response;
    }

    return response;
}, (error) => {
    throw error;
});

export default axiosClient;