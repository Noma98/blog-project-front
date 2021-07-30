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
    async deleteFolder(folderId, userId) {
        const response = await axios.post("/api/folders/delete", {
            folderId, userId
        });
        if (response.data.success) {
            return;
        }
        alert("⛔ 삭제가 불가합니다.")
    }
    async postNewPost(data) {
        const response = await axios.post("/api/posts/create", data);
        if (response.data.success) {
            return;
        }
        alert("⛔ 게시글 생성 실패")
    }
    async fetchPosts(folderId) {
        const response = await axios.post("/api/posts/read", { folderId });
        if (response.data.success) {
            return response.data.payload;
        }
        alert("⛔ 게시글 로드 실패")
    }
    async deletePost(postId, folderId) {
        const response = await axios.post("/api/posts/delete", { postId, folderId });
        if (response.data.success) {
            return;
        }
        alert("⛔ 게시글 삭제 실패");
    }
    async fetchPostDetail(postId) {
        const response = await axios.post("/api/posts/detail", { postId });
        if (response.data.success) {
            return response.data.payload;
        }
        alert("⛔ 게시글 로드 실패");
    }
    async updatePost(data) {
        const response = await axios.post("/api/posts/update", data);
        if (response.data.success) {
            return;
        }
        alert("⛔ 게시글 로드 실패");
    }
    async fetchAllPosts(userId) {
        const response = await axios.post("/api/posts/all", { userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("⛔ 모든 게시글 불러오기 실패");
    }
    async fetchLatest(userId) {
        const response = await axios.post("/api/posts/latest", { userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("⛔ 최신 게시글 불러오기 실패");
    }
    async fetchResults(query, userId) {
        const response = await axios.post("/api/posts/search", { query, userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("⛔ 검색 결과 불러오기 실패");
    }
    async loginGithub(code) {
        const response = await axios.post("/api/users/github", { code });
        return response.data;
    }
    async loginKakao(code) {
        const response = await axios.post("/api/users/kakao", { code });
        return response.data;
    }
}
export default Api;