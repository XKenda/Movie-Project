import axios from "axios";
import { LOCAL_URL } from "../config/env";

const api = axios.create({
    baseURL: `${LOCAL_URL}/api/v1`,
    withCredentials: true,
});

export default api;