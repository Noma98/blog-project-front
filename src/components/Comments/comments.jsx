import React, { memo, useState } from 'react'
import styles from './comments.module.css';
import * as common from '../../common/common.js';
import { Link } from 'react-router-dom';

const Comments = memo(({ post, api, getPostData, isLoggedIn }) => {
    const [text, setText] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert("로그인 후 이용 가능합니다.");
            return;
        }
        if (text.trim() === "") {
            alert("내용을 입력하세요.");
            return;
        }
        const response = await api.createComment({ text, postId: post._id });
        if (!response.success) {
            alert("댓글 생성에 실패하였습니다.");
            return;
        }
        getPostData();
    }
    const handleChange = (e) => {
        setText(e.target.value);
    }
    const deleteComment = async (e) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        const response = await api.deleteComment({
            commentId: e.target.dataset.id, postId: post._id
        });
        if (!response.success) {
            alert("댓글 삭제에 실패했습니다.")
        }
        getPostData();
    }
    return (
        <article className={styles.commentContainer}>
            <h3>Comments</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" value={text} onChange={handleChange} placeholder="로그인 후 이용해주세요." readOnly={isLoggedIn ? false : true} />
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
                            {isLoggedIn?._id === comment.author._id && <button onClick={deleteComment}><i className="fas fa-times" data-id={comment._id}></i></button>}
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
})

export default Comments
