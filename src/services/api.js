import axios from 'axios';
const userAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api/users",
    withCredentials: true
})
const folderAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api/folders",
    withCredentials: true
})
const postAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api/posts",
    withCredentials: true
})
const commentAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api/comments",
    withCredentials: true
})

class Api {
    //-------------User------------------
    async join(data) {
        const response = await userAPI.post('join', data);
        return response.data;
    }
    async socialJoin(data) {
        const response = await userAPI.post('join/social', data);
        return response.data;
    }
    async login(data) {
        const response = await userAPI.post('login', data);
        return response.data;
    }
    async logout() {
        const response = await userAPI.get('logout');
        return response.data;
    }
    async loginGithub(code) {
        const response = await userAPI.post('github', { code });
        return response.data;
    }
    async loginKakao(code) {
        const response = await userAPI.post('kakao', { code });
        return response.data;
    }
    async kakaoUnlink(accessToken) {
        const response = await userAPI.post('kakao/unlink', { accessToken });
        return response.data;
    }
    async googleLogin(userData) {
        const response = await userAPI.post('google', userData);
        return response.data;
    }
    async naverLogin(token) {
        const response = await userAPI.post('naver', { token });
        return response.data;
    }
    async naverUnlink(token) {
        const response = await userAPI.post('naver/unlink', { token });
        return response.data;
    }
    async updatePwd(data) {
        const response = await userAPI.post('update/password', data);
        return response.data;
    }
    async updateUser(data) {
        const response = await userAPI.post('update', data);
        return response.data;
    }
    async deleteUser() {
        const response = await userAPI.get('delete');
        return response.data;
    }
    async updateBlogInfo(data) {
        const response = await userAPI.post('update/blog', data);
        return response.data;
    }
    async fetchPublicUser(nickname) {
        const response = await userAPI.post('public', { nickname });
        if (!response.data.success) {
            return null;
        }
        return response.data.payload;
    }
    async fetchLoginUser() {
        const response = await userAPI.get('auth', {
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
        const response = await folderAPI.get('create');
        if (response.data.success) {
            return;
        }
        alert("폴더 생성에 실패하였습니다.")
    }
    async editFolder(folderId, newName) {
        const response = await folderAPI.post('edit', {
            folderId, newName
        });
        if (response.data.success) {
            return;
        }
        alert("변경 요청에 실패하였습니다.")
    }
    async deleteFolder(folderId, userId) {
        const response = await folderAPI.post('delete', {
            folderId, userId
        });
        if (response.data.success) {
            return;
        }
        alert("삭제 요청에 실패하였습니다.")
    }
    //-----------------Post----------------------
    async createNewPost(data) {
        const response = await postAPI.post('create', data);
        if (response.data.success) {
            return;
        }
        alert("게시글 생성에 실패하였습니다.")
    }
    async updatePost(data) {
        const response = await postAPI.post('update', data);
        if (response.data.success) {
            return;
        }
        alert("게시글 변경에 실패하였습니다.");
    }
    async deletePost(postId, folderId) {
        const response = await postAPI.post('delete', { postId, folderId });
        if (response.data.success) {
            return;
        }
        alert("게시글 삭제 요청에 실패하였습니다.");
    }
    async fetchPosts(folderId) {
        const response = await postAPI.post('read', { folderId });
        return response.data;
    }
    async fetchPostDetail(postId) {
        const response = await postAPI.post('detail', { postId });
        if (response.data.success) {
            return response.data.payload;
        }
        alert("게시글을 불러오는 데 실패하였습니다.");
    }
    async fetchUserPosts(userId) {
        const response = await postAPI.post('user', { userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("게시글을 불러오는 데 실패하였습니다.");
    }
    async fetchResults(query, userId) {
        const response = await postAPI.post('search', { query, userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("게시글 검색에 실패하였습니다.");
    }
    async fetchLatest(userId) {
        const response = await postAPI.post('latest', { userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("최신 글을 불러오는 데 실패하였습니다.");
    }
    async fetchAllPosts() {
        const response = await postAPI.get('all');
        return response.data;
    }
    async fetchAllResults(query) {
        const response = await postAPI.post('search/global', { query });
        return response.data;
    }
    async uploadImage(data) {
        const response = await postAPI.post('image', data);
        return response.data;
    }
    //----------------Comments----------------------
    async createComment(data) {
        const response = await commentAPI.post('create', data);
        return response.data;
    }
}
export default Api;