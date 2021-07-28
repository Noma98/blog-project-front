import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Post from '../../components/Post/post';
import styles from './viewPosts.module.css';

function ViewPosts({ api, user }) {
    const [postsData, setPostsData] = useState();
    const params = new URLSearchParams(useLocation().search);
    const folder = params.get("folder");

    const fetchAllPosts = useCallback(async () => {
        const data = await api.fetchAllPosts(user._id);
        setPostsData(data);
    }, [api, user._id]);
    const fetchPosts = useCallback(async () => {
        const data = await api.fetchPosts(folder);
        setPostsData(data);
    }, [api, folder]);

    useEffect(() => {
        if (folder === "all") {
            fetchAllPosts();
        } else {
            fetchPosts();
        }
    }, [folder, fetchPosts, fetchAllPosts]);
    return (
        <div className={styles.postsContainer}>
            <div className={styles.header}>
                <h1>All Posts
                </h1>
                <button><i className="fas fa-ellipsis-v"></i></button>
            </div>
            {postsData &&
                <div className={styles.posts}>
                    {postsData.length !== 0 ? postsData.map(post => {
                        return <Post key={post._id} post={post} api={api} onFetchPosts={folder === "all" ? fetchAllPosts : fetchPosts} user={user} />
                    }) : <>게시글이 존재하지 않습니다.</>
                    }
                </div>
            }
            <div className={styles.navBtn}>
                <button>1</button>
            </div>
        </div>
    )
}

export default ViewPosts;
