import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5050/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (sessionStorage.getItem('token') || ' ')
    }
});

export default api;