import React, { memo } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './post.module.css';
import * as common from '../../common/common';

const Post = memo(({ post, api, onFetchPosts, user, editMode }) => {
    const history = useHistory();
    const pathName = history.location.pathname;

    const handleDelete = async (e) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) {
            return;
        }
        await api.deletePost(post._id, post.folder);
        onFetchPosts();
    };
    const handleViewPost = (e) => {
        if (editMode) {
            return;
        }
        if (e.target.nodeName !== "I") {
            history.push(`/@${user.name}/post/${post._id}`);
        }
    }
    return (
        <article className={`${styles.post} ${editMode && styles.editMode}`} onClick={handleViewPost}>
            {post.thumbnail && <img src={post.thumbnail} alt="thumbnail" />}
            <div className={styles.content}>
                <div className={styles.headerBox}>
                    <h3>{post.title}</h3>
                    {pathName === `/@${user.name}` &&
                        <div className={styles.new}>New</div>}
                </div>
                <small>{`${user.name} · ${common.getFormattedDate(post.createdAt)}`}</small>
                {post.tags[0] !== "" && <div className={styles.tagContainer}>
                    {post.tags.map(tag => <span className={styles.tag} key={tag.id}>{tag.name}</span>)}
                </div>}
                <p className={styles.description}>{post.description}</p>
            </div>
            {pathName !== "/" && editMode && <button className={styles.delete} onClick={handleDelete}><i className="fas fa-times"></i></button>}
        </article>
    )
});

export default Post
