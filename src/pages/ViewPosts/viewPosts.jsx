import React, { memo, useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/loading';
import Post from '../../components/Post/post';
import ErrorPage from '../ErrorPage/errorPage';
import styles from './viewPosts.module.css';

let folderName;

const ViewPosts = memo(({ api, user, isLoggedIn }) => {
    const [postsData, setPostsData] = useState();
    const [notFound, setNotFound] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const params = new URLSearchParams(useLocation().search);
    const folder = params.get("folder");
    const query = params.get("query");

    const history = useHistory();

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        const response = await api.fetchPosts(folder);
        if (!response.success) {
            setLoading(false);
            setNotFound(true);
            return;
        }
        setLoading(false);
        setPostsData(response.payload);
    }, [api, folder]);

    const fetchAllPosts = useCallback(async () => {
        setLoading(true);
        const data = await api.fetchUserPosts(user._id);
        setLoading(false);
        setPostsData(data);
    }, [api, user._id]);

    const fetchResults = useCallback(async () => {
        const data = await api.fetchResults(query, user._id);
        setPostsData(data);
    }, [query, api, user._id])

    useEffect(() => {
        const confirmFolderId = new RegExp(/^[0-9a-f]{24}$/).test(folder);
        setNotFound(false);

        // 지원하지 않는 경로일 때
        if ((!folder && !query) || (!query && folder !== "all" && !confirmFolderId) || !user) {
            setNotFound(true);
            return;
        }
        // 검색 경로(/posts?query=쿼리)일 때
        if (query) {
            folderName = `"${query}"의 검색 결과`;
            fetchResults();
        }
        // 전체 보기 경로(/posts?folder=all)일 때
        if (folder === "all") {
            folderName = "All Posts";
            fetchAllPosts();
            return;
        }

        // 폴더 경로(/posts?folder=폴더ID)일 때
        if (confirmFolderId) {
            const findFolder = user.folders.filter(x => x._id === folder)[0];
            folderName = findFolder ? findFolder.name : "잘못된 경로입니다.";
            fetchPosts();
            return;
        }
    }, [user, query, folder, fetchAllPosts, fetchPosts, fetchResults])

    const handleCreate = () => {
        history.push({
            pathname: `/@${user.name}/posts/create`,
            state: folder,
        });
    };
    const handleEdit = () => {
        setEditMode(!editMode);
    }
    return (
        <section className={styles.postsContainer}>
            {loading ? <Loading />
                : <>
                    {
                        notFound ?
                            <ErrorPage statusCode="404" />
                            : <>
                                {postsData ? <>
                                    <div className={styles.header}>
                                        <h1>{folderName}</h1>
                                        {user._id === isLoggedIn?._id && <>
                                            <button onClick={handleCreate}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button onClick={handleEdit} className={`${styles.editBtn} ${editMode && styles.highlight}`}>
                                                <i className="fas fa-ellipsis-v"></i>
                                            </button>
                                        </>}
                                    </div>
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
                                            <>게시글이 존재하지 않습니다.</>
                                        }
                                    </div>
                                </> : <></>

                                }
                            </>
                    }
                </>}
        </section>
    )
});

export default ViewPosts;
