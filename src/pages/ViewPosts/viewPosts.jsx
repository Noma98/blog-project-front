import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Post from '../../components/Post/post';
import styles from './viewPosts.module.css';

function ViewPosts({ api, user }) {
    const [postsData, setPostsData] = useState();
    const params = new URLSearchParams(useLocation().search);
    const folder = params.get("folder");
    const query = params.get("query");

    const fetchPosts = useCallback(async () => {
        const data = await api.fetchPosts(folder);
        setPostsData(data);
    }, [api, folder]);

    const fetchAllPosts = useCallback(async () => {
        const data = await api.fetchAllPosts(user._id);
        setPostsData(data);
    }, [api, user._id]);

    const fetchResults = useCallback(async () => {
        const data = await api.fetchResults(query, user._id);
        setPostsData(data);
    }, [query, api, user._id])

    useEffect(() => {
        // 폴더 경로(/posts?folder=폴더ID)일 때
        !query && folder !== "all" && fetchPosts();
    }, [query, folder, fetchPosts]);

    useEffect(() => {
        // 검색 경로(/posts?folder=all&query=쿼리)일 때
        query && fetchResults(query);
    }, [query, fetchResults])

    useEffect(() => {
        // 전체 보기 경로(/posts?folder=all)일 때
        !query && folder === "all" && fetchAllPosts();
    }, [query, folder, fetchAllPosts])

    return (
        <div className={styles.postsContainer}>
            <div className={styles.header}>
                <h1>{query ? `Search results for "${query}"` : "All Posts"}</h1>
                <button><i className="fas fa-ellipsis-v"></i></button>
            </div>
            {postsData &&
                <div className={styles.posts}>
                    {postsData.length !== 0 ? postsData.map(post => {
                        return <Post key={post._id} post={post} api={api} onFetchPosts={folder === "all" ? fetchAllPosts : fetchPosts} user={user} />
                    }) : <>{query ? `"${query}"의 검색 결과가 존재하지 않습니다.` : "게시글이 존재하지 않습니다."}</>
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
