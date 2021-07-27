import styles from './postDetail.module.css';

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getFormattedDate } from '../../common';

function PostDetail({ api, user }) {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();

    const getPostData = async () => {
        const data = await api.fetchPostDetail(id);
        setPostInfo(data);
    };
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
                        <button><i className="fas fa-pen"></i></button>
                        <button><i className="fas fa-trash-alt"></i></button>
                    </div>
                </div>
                <div className={styles.tags}>
                    {postInfo.tags[0] !== "" && postInfo.tags.map(tag => <span key={Math.random().toString(36).substr(2, 8)}>{tag}</span>)}
                </div>
                <p className={styles.description}>{postInfo.description}</p>
            </>}
        </div>
    )
}

export default PostDetail
