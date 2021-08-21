import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PublicPost from '../../components/PublicPost/publicPost';
import styles from './publicHome.module.css';

function PublicHome({ api, onFetchLoginData, onFetchUser }) {
    const [posts, setPosts] = useState();
    const location = useLocation();
    const params = new URLSearchParams(useLocation().search);
    const query = params.get("query");

    useEffect(() => {
        const fetchData = async () => {
            const response = query ? await api.fetchAllResults(query) : await api.fetchAllPosts();
            if (!response.success) {
                return;
            }
            setPosts(response.payload);
        }
        fetchData();
    }, [api, query]);
    useEffect(() => {
        if (query) {
            return;
        }
        if (!location.state) {
            onFetchUser(1);
            return;
        }
        const fetchData = async () => {
            window.localStorage.clear();
            await api.logout();
            onFetchUser(1);
            onFetchLoginData(1);
        }
        fetchData();
    }, [api, query, location, onFetchLoginData, onFetchUser])

    return (
        <div className={styles.home}>
            <div className={styles.header}>
                <h2>{query ? `"${query}"의 검색 결과` : "Latest Posts"}</h2>
                <i className="far fa-heart"></i>
            </div>
            <div className={styles.posts}>
                {posts?.length !== 0 ? posts?.map(post => <PublicPost key={post._id} post={post} />) : <p className={styles.message}>게시글이 없습니다.</p>}
            </div>
        </div>
    )
}

export default PublicHome
