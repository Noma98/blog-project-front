import React, { memo, useState } from 'react'
import styles from './comments.module.css';
import * as common from '../../common/common.js';
import { Link } from 'react-router-dom';

const Comments = memo(({ post, api, getPostData }) => {
    const [comment, setComment] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.createComment({ text: comment, postId: post._id });
        if (!response.success) {
            alert("로그인 후 이용 가능합니다.");
            return;
        }
        getPostData();
    }
    const handleChange = (e) => {
        setComment(e.target.value);
    }
    return (
        <div className={styles.commentContainer}>
            <h3>Comments</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" value={comment} onChange={handleChange} placeholder="로그인 후 이용해주세요." />
                <button><i className="fas fa-arrow-right"></i></button>
            </form>
            <div className={styles.comments}>
                {post.comments?.map(comment =>
                    <div className={styles.comment}>
                        <Link to={`/@${comment.author.name}`}>
                            <img src={comment.author.avatar || "/assets/images/default.PNG"} alt="avatar" />
                            <small>{comment.author.name}</small>
                        </Link>
                        <div className={styles.content}>
                            <p>{comment.text}</p>
                            <small>{common.getElapsed(comment.createdAt)}</small>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
})

export default Comments
