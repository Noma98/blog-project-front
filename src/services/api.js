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
        const { isAuth, _id, name, email, avatar, blogInfo, folders } = response.data;
        if (!isAuth) {
            return null;
        }
        return { _id, name, email, avatar, blogInfo, folders };
    }
    async makeFolder() {
        const response = await axios.get("/api/folders/create");
        if (response.data.success) {
            return;
        }
        alert("⛔ 폴더 생성에 실패하였습니다.")
    }
    async editFolder(folderId, newName) {
        const response = await axios.post("/api/folders/edit", {
            folderId, newName
        });
        if (response.data.success) {
            return;
        }
        alert("⛔ 변경에 실패하였습니다.")
    }
}
export default Api;