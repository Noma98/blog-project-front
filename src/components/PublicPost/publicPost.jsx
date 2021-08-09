import React from 'react'
import styles from './publicPost.module.css';
import { getFormattedDate } from '../../common';
import { useHistory } from 'react-router-dom';

function PublicPost({ post }) {
    const history = useHistory();
    const handleViewPost = () => {
        history.push(`/@${post.author.name}/post/${post._id}`)
    }
    return (
        <div className={styles.container}>
            {post && <>
                <div className={styles.post} onClick={handleViewPost}>
                    <h3>{post.title}</h3>
                    <div className={styles.meta}>
                        <img src={post.author.avatar || "/images/default.PNG"} alt="avatar" />
                        <small>{`${post.author.name} · ${getFormattedDate(post.createdAt)}`}</small>
                    </div>
                    {post.tags[0] !== "" && <div className={styles.tagContainer}>
                        {post.tags.map(tag => <span className={styles.tag} key={tag.id}>{tag.name}</span>)}
                    </div>}
                    <p className={styles.description}>{post.description}</p>
                </div>
            </>}
        </div>
    )
}

export default PublicPost
