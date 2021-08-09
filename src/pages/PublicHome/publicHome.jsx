import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PublicPost from '../../components/PublicPost/publicPost';
import styles from './publicHome.module.css';

function PublicHome({ api }) {
    const [posts, setPosts] = useState();
    const params = new URLSearchParams(useLocation().search);
    const query = params.get("query");

    useEffect(() => {
        const fetchData = async () => {
            const response = query ? await api.getAllResults(query) : await api.getAllPosts();
            if (!response.success) {
                return;
            }
            setPosts(response.payload);
        }
        fetchData();
    }, [api, query]);

    return (
        <div className={styles.home}>
            <h2>{query ? `"${query}"의 검색 결과` : <><i className="far fa-clock"></i>Latest</>}</h2>
            <div className={styles.posts}>
                {posts?.length !== 0 ? posts?.map(post => <PublicPost key={post._id} post={post} />) : <p>게시글이 없습니다.</p>}
            </div>
        </div>
    )
}

export default PublicHome
