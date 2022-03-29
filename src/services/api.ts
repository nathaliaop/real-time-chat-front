import axios from 'axios';
import env from "react-dotenv";

const api = axios.create({
    baseURL: env.API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;