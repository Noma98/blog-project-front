import styles from './postDetail.module.css';

import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { getFormattedDate } from '../../common';

function PostDetail({ api, user }) {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    const history = useHistory();

    const getPostData = async () => {
        const data = await api.fetchPostDetail(id);
        setPostInfo(data);
    };
    const handleEdit = () => {
        history.push(`/posts/edit/${postInfo._id}`);
    }
    const handleDelete = async () => {
        await api.deletePost(postInfo._id, postInfo.folder);
        history.push(`/${postInfo.folder}`);
    }
    useEffect(() => {
        getPostData();
    }, []);
    return (
        <div className={styles.postDetail}>
            {postInfo && <>
                <h2>{postInfo.title}</h2>
                <div className={styles.metaAndBtns}>
                    <small>{`${user.name} · ${getFormattedDate(postInfo.createdAt)}`}</small>
                    <div className={styles.btns}>
                        <button onClick={handleEdit}><i className="fas fa-pen"></i></button>
                        <button onClick={handleDelete}><i className="fas fa-trash-alt"></i></button>
                    </div>
                </div>
                <div className={styles.tags}>
                    {postInfo.tags[0] !== "" && postInfo.tags.map(tag => <span key={Math.random().toString(36).substr(2, 8)}>{tag}</span>)}
                </div>
                <pre className={styles.description}>{postInfo.description}</pre>
            </>}
        </div>
    )
}

export default PostDetail
