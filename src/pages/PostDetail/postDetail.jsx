import styles from './postDetail.module.css';

import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { getFormattedDate } from '../../common';

function PostDetail({ api, user }) {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    const history = useHistory();

    const getPostData = useCallback(async () => {
        const data = await api.fetchPostDetail(id);
        setPostInfo(data);
    }, [api, id]);
    const handleEdit = () => {
        history.push(`/posts/edit/${postInfo._id}`);
    }
    const handleDelete = async () => {
        await api.deletePost(postInfo._id, postInfo.folder);
        history.push(`/${postInfo.folder}`);
    }
    useEffect(() => {
        getPostData();
    }, [getPostData]);
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
                <div className={styles.tagContainer}>
                    {postInfo.tags[0] !== "" && postInfo.tags.map(tag => <div className={styles.tag} key={tag.id}>{tag.name}</div>)}
                </div>
                <pre className={styles.description}>{postInfo.description}</pre>
            </>}
        </div>
    )
}

export default PostDetail
