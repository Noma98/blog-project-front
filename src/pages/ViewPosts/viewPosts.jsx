import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/loading';
import Post from '../../components/Post/post';
import styles from './viewPosts.module.css';

function ViewPosts({ api, user }) {
    const [postsData, setPostsData] = useState();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const params = new URLSearchParams(useLocation().search);
    const folder = params.get("folder");
    const query = params.get("query");
    const history = useHistory();
    const folderName = new RegExp(/([0-9a-f]){24}/).test(folder) ? user.folders.filter(x => x._id === folder)[0].name : "All Posts";

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        const data = await api.fetchPosts(folder);
        setLoading(false);
        setPostsData(data);
    }, [api, folder]);

    const fetchAllPosts = useCallback(async () => {
        setLoading(true);
        const data = await api.fetchAllPosts(user._id);
        setLoading(false);
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

    const handleCreate = () => {
        history.push("/posts/create");
    };
    const handleEdit = () => {
        setEditMode(!editMode);
    }
    return (
        <div className={styles.postsContainer}>
            {loading ? <Loading /> : <>
                <div className={styles.header}>
                    <h1>{query ? `Search results for "${query}"` : folderName}</h1>
                    <button onClick={handleCreate}>
                        <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={handleEdit} className={`${styles.editBtn} ${editMode && styles.highlight}`}>
                        <i className="fas fa-ellipsis-v"></i>
                    </button>
                </div>
                {postsData &&
                    <div className={`${styles.posts} ${editMode && styles.editMode}`}>
                        {postsData.length !== 0 ?
                            postsData.map(post => {
                                return <Post
                                    key={post._id}
                                    post={post}
                                    api={api}
                                    onFetchPosts={folder === "all" ? fetchAllPosts : fetchPosts}
                                    user={user}
                                    editMode={editMode}
                                />
                            })
                            :
                            <>{query ? `"${query}"의 검색 결과가 존재하지 않습니다.` : "게시글이 존재하지 않습니다."}</>
                        }
                    </div>
                }
            </>}
        </div>
    )
}

export default ViewPosts;
