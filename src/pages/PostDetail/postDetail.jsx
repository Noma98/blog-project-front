import styles from './postDetail.module.css';

import React, { memo, useCallback, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/loading';
import * as common from '../../common/common';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Comments from '../../components/Comments/comments';

const PostDetail = memo(({ api, user, isLoggedIn }) => {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    const history = useHistory();
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
        history.push(`/@${user?.name}/posts?folder=${postInfo.folder}`);
    }

    useEffect(() => {
        getPostData();
    }, [getPostData]);

    const handleBack = () => {
        history.goBack();
    }
    //PublicHome에서 들어오면 user가 null이므로, obtional Chaining 처리
    return (
        <div className={styles.postDetail}>
            {loading ? <Loading /> : <>
                {postInfo && <>
                    <div className={styles.postingMeta}>
                        <button className={styles.back} onClick={handleBack}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <h2>{postInfo.title}</h2>
                        <div className={styles.metaAndBtns}>
                            <div className={styles.meta}>
                                <Link to={`/@${user?.name}`}><img src={user?.avatar} alt="avatar" />{user?.name}</Link>
                                <span>{` · ${common.getFormattedDate(postInfo.createdAt)}`}</span>
                            </div>
                            {user?._id === isLoggedIn?._id &&
                                <div className={styles.btns}>
                                    <button onClick={handleEdit}><i className="fas fa-pen"></i></button>
                                    <button onClick={handleDelete}><i className="fas fa-trash-alt"></i></button>
                                </div>}
                        </div>
                        <div className={styles.tagContainer}>
                            {postInfo.tags[0] !== "" && postInfo.tags.map(tag => <div className={styles.tag} key={tag.id}>{tag.name}</div>)}
                        </div>
                    </div>
                    <ReactQuill
                        value={postInfo.htmlContent}
                        theme="bubble"
                        readOnly={true}
                        modules={{ syntax: true }}
                        className={styles.quillEditor}
                    />
                    <Comments post={postInfo} api={api} getPostData={getPostData} isLoggedIn={isLoggedIn} />
                </>}
            </>}
        </div >
    )
})

export default PostDetail
