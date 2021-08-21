import React, { memo } from 'react'
import styles from './publicPost.module.css';
import * as common from '../../common/common';
import { useHistory } from 'react-router-dom';
import defaultImage from '../../assets/images/default.PNG';

const PublicPost = memo(({ post }) => {
    const history = useHistory();
    const handleViewPost = () => {
        history.push(`/@${post.author.name}/post/${post._id}`)
    }
    return (
        <>
            {post && <>
                <div className={styles.post} onClick={handleViewPost}>
                    {post.thumbnail && <img className={styles.thumbnail} src={post.thumbnail} alt="thumbnail" />}
                    <div className={styles.content}>
                        <h3>{post.title}</h3>
                        {post.tags[0] !== "" && <div className={styles.tagContainer}>
                            {post.tags.map(tag => <span className={styles.tag} key={tag.id}>{tag.name}</span>)}
                        </div>}
                        <p className={styles.description}>{post.description}</p>
                    </div>
                    <div className={styles.meta}>
                        <img src={post.author.avatar || defaultImage} alt="avatar" />
                        <small>{`${post.author.name} · ${common.getFormattedDate(post.createdAt)}`}</small>
                    </div>
                </div>
            </>}
        </>
    )
})

export default PublicPost
