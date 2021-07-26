import React from 'react'
import styles from './post.module.css';

function Post({ post }) {
    return (
        <div className={styles.post}>
            <h3>{post.title}</h3>
            <small>{post.createdAt.substr(0, 10)}</small>
            {post.tags[0] !== "" && <div className={styles.tags}>
                {post.tags.map(tag => <span key={Math.random().toString(36).substr(2, 8)}>{tag}</span>)}
            </div>}
            <p>{post.description}</p>
        </div>
    )
}

export default Post
