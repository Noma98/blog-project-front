import React from 'react'
import styles from './publicPost.module.css';
import * as common from '../../common/common';
import { useHistory } from 'react-router-dom';
import defaultImage from '../../assets/images/default.PNG';

function PublicPost({ post }) {
    const history = useHistory();
    const handleViewPost = () => {
        history.push(`/@${post.author.name}/post/${post._id}`)
    }
    return (
        <>
            {post && <>
                <div className={styles.post} onClick={handleViewPost}>
                    <h3>{post.title}</h3>
                    <div className={styles.meta}>
                        <img src={post.author.avatar || defaultImage} alt="avatar" />
                        <small>{`${post.author.name} · ${common.getFormattedDate(post.createdAt)}`}</small>
                    </div>
                    <p className={styles.description}>{post.description}</p>
                    {post.tags[0] !== "" && <div className={styles.tagContainer}>
                        {post.tags.map(tag => <span className={styles.tag} key={tag.id}>{tag.name}</span>)}
                    </div>}
                </div>
            </>}
        </>
    )
}

export default PublicPost
