import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Post from '../../components/Post/post';
import styles from './viewPosts.module.css';

function ViewPosts({ api }) {
    const [postsData, setPostsData] = useState();
    const { id: folderId } = useParams();

    const fetchPosts = useCallback(async () => {
        const data = await api.fetchPosts(folderId);
        setPostsData(data);
    }, [api, folderId]);
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);
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
                        return <Post key={post._id} post={post} />
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
