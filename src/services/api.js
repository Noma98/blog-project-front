import axios from 'axios';
class Api {
    async getAllPosts() {
        const response = await axios.get("/api/posts/all");
        return response.data;
    }
    async getAllResults(query) {
        const response = await axios.post("/api/posts/search/global", { query });
        return response.data;
    }
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
    async getPublicUserData(nickname) {
        const response = await axios.post("/api/users/public", { nickname });
        if (!response.data.success) {
            return null;
        }
        return response.data.payload;
    }
    async getLoginData() {
        const response = await axios.get("/api/users/auth");
        if (!response.data.success) {
            return null;
        }
        const { _id, name } = response.data.payload;
        return { _id, name };
    }
    async updatePwd(data) {
        const response = await axios.post("/api/users/update/password", data);
        return response.data;
    }
    async updateUser(data) {
        const response = await axios.post("/api/users/update", data);
        return response.data;
    }
    async deleteUser(userId) {
        const response = await axios.post("/api/users/delete", { userId });
        return response.data;
    }
    async updateBlogInfo(data) {
        const response = await axios.post("/api/users/update/blog", data);
        return response.data;
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
        return response.data;
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
        const response = await axios.post("/api/posts/user", { userId });
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
    async kakaoUnlink(accessToken) {
        const response = await axios.post("/api/users/kakao/unlink", { accessToken });
        return response.data;
    }
    async googleLogin(userData) {
        const response = await axios.post("/api/users/google", userData);
        return response.data;
    }
    async naverLogin(token) {
        const response = await axios.post("/api/users/naver", { token });
        return response.data;
    }
    async naverUnlink(token) {
        const response = await axios.post("/api/users/naver/unlink", { token });
        return response.data;
    }
}
export default Api;