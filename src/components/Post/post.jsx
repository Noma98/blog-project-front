import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from './post.module.css';
import { getFormattedDate } from '../../common';

function Post({ post, api, onFetchPosts, user }) {
    const history = useHistory();
    const handleDelete = async () => {
        await api.deletePost(post._id, post.folder);
        onFetchPosts();
    };
    const handleViewPost = () => {
        history.push(`/posts/${post._id}`);
    }
    return (
        <div className={styles.post} onClick={handleViewPost}>
            <h3>{post.title}</h3>
            <small>{`${user.name} · ${getFormattedDate(post.createdAt)}`}</small>
            {post.tags[0] !== "" && <div className={styles.tags}>
                {post.tags.map(tag => <span key={Math.random().toString(36).substr(2, 8)}>{tag}</span>)}
            </div>}
            <p>{post.description}</p>
            <button className={styles.delete} onClick={handleDelete}><i className="fas fa-times"></i></button>
        </div>
    )
}

export default Post
