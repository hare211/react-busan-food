import axios, {AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "http://localhost",
    headers: {
        "Content-Type": "application/json",
    }
})

export default apiClient;