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
    async getLogout() {
        const response = await axios.get("/api/users/logout");
        return response.data;
    }
    async getUserData() {
        const response = await axios.get("/api/users/auth");
        const { isAuth, _id, name, email, avatar, blogInfo } = response.data;
        if (!isAuth) {
            return null;
        }
        return { _id, name, email, avatar, blogInfo };
    }
}
export default Api;