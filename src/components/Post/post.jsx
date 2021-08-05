import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from './post.module.css';
import { getFormattedDate } from '../../common';

function Post({ post, api, onFetchPosts, user, editMode }) {
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
            history.push(`/post/${post._id}`);
        }
    }
    return (
        <div className={`${styles.post} ${editMode && styles.editMode}`} onClick={handleViewPost}>
            {pathName === "/" &&
                <div className={styles.new}>New</div>}
            <h3>{post.title}</h3>
            <small>{`${user.name} · ${getFormattedDate(post.createdAt)}`}</small>
            {post.tags[0] !== "" && <div className={styles.tagContainer}>
                {post.tags.map(tag => <span className={styles.tag} key={tag.id}>{tag.name}</span>)}
            </div>}
            <p className={styles.description}>{post.description}</p>
            {pathName !== "/" && editMode && <button className={styles.delete} onClick={handleDelete}><i className="fas fa-times"></i></button>}
        </div>
    )
}

export default Post
