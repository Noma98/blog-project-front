import axios from 'axios';

class Api {
    async postJoin(data) {
        const response = await axios.post("/api/users/join", data);
        return response.data;
    }
    async postLogin(data) {
        const response = await axios.post("/api/users/login", data);
        return response.data;
    }
}
export default Api;