import styles from './postDetail.module.css';

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { getFormattedDate } from '../../common';
import Loading from '../../components/Loading/loading';
import * as common from '../../common';

function PostDetail({ api, user, isLoggedIn }) {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    const history = useHistory();
    const textRef = useRef();
    const [loading, setLoading] = useState(false);

    const getPostData = useCallback(async () => {
        setLoading(true);
        const data = await api.fetchPostDetail(id);
        setLoading(false);
        setPostInfo(data);
    }, [api, id]);

    const handleEdit = () => {
        history.push(`/@${user?.name}/posts/edit/${postInfo._id}`);
    }

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) {
            return;
        }
        setLoading(true);
        await api.deletePost(postInfo._id, postInfo.folder);
        setLoading(false);
        history.push(`/${postInfo.folder}`);
    }

    useEffect(() => {
        getPostData();
    }, [getPostData]);

    useEffect(() => {
        common.setTextareaHeight(textRef);
    });
    //PublicHome에서 들어오면 user가 null이므로, obtional Chaining 처리
    return (
        <div className={styles.postDetail}>
            {loading ? <Loading /> : <>
                {postInfo && <>
                    <h2>{postInfo.title}</h2>
                    <div className={styles.metaAndBtns}>
                        <small>{`${user?.name} · ${getFormattedDate(postInfo.createdAt)}`}</small>
                        {user?._id === isLoggedIn?._id &&
                            <div className={styles.btns}>
                                <button onClick={handleEdit}><i className="fas fa-pen"></i></button>
                                <button onClick={handleDelete}><i className="fas fa-trash-alt"></i></button>
                            </div>}
                    </div>
                    <div className={styles.tagContainer}>
                        {postInfo.tags[0] !== "" && postInfo.tags.map(tag => <div className={styles.tag} key={tag.id}>{tag.name}</div>)}
                    </div>
                    <textarea ref={textRef} readOnly className={styles.description} value={postInfo.description}></textarea>
                </>}
            </>}
        </div>
    )
}

export default PostDetail
