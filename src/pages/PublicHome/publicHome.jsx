import React, { useEffect, useState } from 'react'
import PublicPost from '../../components/PublicPost/publicPost';
import styles from './publicHome.module.css';

function PublicHome({ api }) {
    const [posts, setPosts] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.getAllPosts();
            if (!response.success) {
                return;
            }
            setPosts(response.payload);
        }
        fetchData();
    }, [api]);

    return (
        <div className={styles.home}>
            <h2>Trending</h2>
            <div className={styles.posts}>
                {posts && posts.map(post => <PublicPost key={post._id} post={post} />)}
            </div>
        </div>
    )
}

export default PublicHome
