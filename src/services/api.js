import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);
class Api {
    //-------------User------------------
    async join(data) {
        const response = await axios.post(`${API_URL}/api/users/join`, data);
        return response.data;
    }
    async socialJoin(data) {
        const response = await axios.post(`${API_URL}/api/users/join/social`, data);
        return response.data;
    }
    async login(data) {
        const response = await axios.post(`${API_URL}/api/users/login`, data, { withCredentials: true, credentials: 'include' });
        return response.data;
    }
    async logout() {
        const response = await axios.get(`${API_URL}/api/users/logout`, { withCredentials: true, credentials: 'include' });
        return response.data;
    }
    async loginGithub(code) {
        const response = await axios.post(`${API_URL}/api/users/github`, { code }, { withCredentials: true, credentials: 'include' });
        return response.data;
    }
    async loginKakao(code) {
        const response = await axios.post(`${API_URL}/api/users/kakao`, { code }, { withCredentials: true, credentials: 'include' });
        return response.data;
    }
    async kakaoUnlink(accessToken) {
        const response = await axios.post(`${API_URL}/api/users/kakao/unlink`, { accessToken });
        return response.data;
    }
    async googleLogin(userData) {
        const response = await axios.post(`${API_URL}/api/users/google`, userData, { withCredentials: true, credentials: 'include' });
        return response.data;
    }
    async naverLogin(token) {
        const response = await axios.post(`${API_URL}/api/users/naver`, { token }, { withCredentials: true, credentials: 'include' });
        return response.data;
    }
    async naverUnlink(token) {
        const response = await axios.post(`${API_URL}/api/users/naver/unlink`, { token });
        return response.data;
    }
    async updatePwd(data) {
        const response = await axios.post(`${API_URL}/api/users/update/password`, data, { withCredentials: true });
        return response.data;
    }
    async updateUser(data) {
        const response = await axios.post(`${API_URL}/api/users/update`, data, { withCredentials: true });
        return response.data;
    }
    async deleteUser(userId) {
        const response = await axios.post(`${API_URL}/api/users/delete`, { userId }, { withCredentials: true });
        return response.data;
    }
    async updateBlogInfo(data) {
        const response = await axios.post(`${API_URL}/api/users/update/blog`, data, { withCredentials: true });
        return response.data;
    }
    async fetchPublicUser(nickname) {
        const response = await axios.post(`${API_URL}/api/users/public`, { nickname });
        if (!response.data.success) {
            return null;
        }
        return response.data.payload;
    }
    async fetchLoginUser() {
        const response = await axios.get(`${API_URL}/api/users/auth`, {
            withCredentials: true
        });
        if (!response.data.success) {
            return null;
        }
        const { _id, name } = response.data.payload;
        return { _id, name };
    }
    //------------------Folder---------------------
    async makeFolder() {
        const response = await axios.get(`${API_URL}/api/folders/create`, { withCredentials: true });
        if (response.data.success) {
            return;
        }
        alert("폴더 생성에 실패하였습니다.")
    }
    async editFolder(folderId, newName) {
        const response = await axios.post(`${API_URL}/api/folders/edit`, {
            folderId, newName
        }, { withCredentials: true });
        if (response.data.success) {
            return;
        }
        alert("변경 요청에 실패하였습니다.")
    }
    async deleteFolder(folderId, userId) {
        const response = await axios.post(`${API_URL}/api/folders/delete`, {
            folderId, userId
        }, { withCredentials: true });
        if (response.data.success) {
            return;
        }
        alert("삭제 요청에 실패하였습니다.")
    }
    //-----------------Post----------------------
    async createNewPost(data) {
        const response = await axios.post(`${API_URL}/api/posts/create`, data, { withCredentials: true });
        if (response.data.success) {
            return;
        }
        alert("게시글 생성에 실패하였습니다.")
    }
    async updatePost(data) {
        const response = await axios.post(`${API_URL}/api/posts/update`, data, { withCredentials: true });
        if (response.data.success) {
            return;
        }
        alert("게시글 변경에 실패하였습니다.");
    }
    async deletePost(postId, folderId) {
        const response = await axios.post(`${API_URL}/api/posts/delete`, { postId, folderId }, { withCredentials: true });
        if (response.data.success) {
            return;
        }
        alert("게시글 삭제 요청에 실패하였습니다.");
    }
    async fetchPosts(folderId) {
        const response = await axios.post(`${API_URL}/api/posts/read`, { folderId });
        return response.data;
    }
    async fetchPostDetail(postId) {
        const response = await axios.post(`${API_URL}/api/posts/detail`, { postId });
        if (response.data.success) {
            return response.data.payload;
        }
        alert("게시글을 불러오는 데 실패하였습니다.");
    }
    async fetchUserPosts(userId) {
        const response = await axios.post(`${API_URL}/api/posts/user`, { userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("게시글을 불러오는 데 실패하였습니다.");
    }
    async fetchResults(query, userId) {
        const response = await axios.post(`${API_URL}/api/posts/search`, { query, userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("게시글 검색에 실패하였습니다.");
    }
    async fetchLatest(userId) {
        const response = await axios.post(`${API_URL}/api/posts/latest`, { userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("최신 글을 불러오는 데 실패하였습니다.");
    }
    async fetchAllPosts() {
        const response = await axios.get(`${API_URL}/api/posts/all`);
        return response.data;
    }
    async fetchAllResults(query) {
        const response = await axios.post(`${API_URL}/api/posts/search/global`, { query });
        return response.data;
    }
}
export default Api;