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
        alert("?????? ????????? ?????????????????????.")
    }
    async editFolder(folderId, newName) {
        const response = await folderAPI.post('edit', {
            folderId, newName
        });
        if (response.data.success) {
            return;
        }
        alert("?????? ????????? ?????????????????????.")
    }
    async deleteFolder(folderId, userId) {
        const response = await folderAPI.post('delete', {
            folderId, userId
        });
        if (response.data.success) {
            return;
        }
        alert("?????? ????????? ?????????????????????.")
    }
    //-----------------Post----------------------
    async createNewPost(data) {
        const response = await postAPI.post('create', data);
        if (response.data.success) {
            return;
        }
        alert("????????? ????????? ?????????????????????.")
    }
    async updatePost(data) {
        const response = await postAPI.post('update', data);
        if (response.data.success) {
            return;
        }
        alert("????????? ????????? ?????????????????????.");
    }
    async deletePost(postId, folderId) {
        const response = await postAPI.post('delete', { postId, folderId });
        if (response.data.success) {
            return;
        }
        alert("????????? ?????? ????????? ?????????????????????.");
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
        alert("???????????? ???????????? ??? ?????????????????????.");
    }
    async fetchUserPosts(userId) {
        const response = await postAPI.post('user', { userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("???????????? ???????????? ??? ?????????????????????.");
    }
    async fetchResults(query, userId) {
        const response = await postAPI.post('search', { query, userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("????????? ????????? ?????????????????????.");
    }
    async fetchLatest(userId) {
        const response = await postAPI.post('latest', { userId });
        if (response.data.success) {
            return response.data.payload;
        }
        return alert("?????? ?????? ???????????? ??? ?????????????????????.");
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
    async deleteComment(data) {
        const response = await commentAPI.post('delete', data);
        return response.data;
    }
    //---------------Weather---------------------
    async getWeather(lat, lon) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`);
        return response.data;
    }
}
export default Api;