import React, { useState } from 'react'
import useInputs from '../../../hooks/useInputs';
import styles from "../settings.module.css";

function SetBlog({ user, api, onFetchUser }) {
    const [{ blogName, introduction }, onChange] = useInputs({
        blogName: user.blogInfo.name,
        introduction: user.blogInfo.introduction,
    })
    const [blogErr, setBlogErr] = useState(null);
    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        setBlogErr(null);
        const response = await api.updateBlogInfo({ userId: user._id, introduction, name: blogName });
        if (!response.success) {
            setBlogErr(response.message);
            return;
        }
        onFetchUser();
        alert("변경이 완료되었습니다.");
    }
    return (
        <article className={styles.edit}>
            <form onChange={onChange} onSubmit={handleBlogSubmit} className={styles.editBlog}>
                <h2>블로그 정보</h2>
                {blogErr && <small>
                    <i className="fas fa-exclamation-circle"></i> {blogErr}</small>}
                <button className={styles.editBtn}>변경</button>
                <label>블로그 이름
                    <input name="blogName" type="text" required value={blogName} maxLength="25" />
                </label>
                <label>블로그 소개글
                    <textarea name="introduction" value={introduction} />
                </label>
            </form>
        </article>
    )
}

export default SetBlog