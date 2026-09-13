import axios from "axios";
import { LOCAL_URL } from "../config/env";

const api = axios.create({
    baseURL: `/api/v1`,
    withCredentials: true,
});

export default api;