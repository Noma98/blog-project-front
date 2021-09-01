import React, { useState } from 'react'
import styles from "../settings.module.css";

function SetBlog({ user, api, onFetchUser }) {
    const [blogName, setBlogName] = useState(user.blogInfo.name);
    const [introduction, setIntroduction] = useState(user.blogInfo.introduction);
    const [blogErr, setBlogErr] = useState(null);

    const handleBlogName = (e) => {
        setBlogName(e.target.value);
    }
    const handleIntroduction = (e) => {
        setIntroduction(e.target.value);
    }
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
            <form onSubmit={handleBlogSubmit} className={styles.editBlog}>
                <h2>블로그 정보</h2>
                {blogErr && <small>
                    <i className="fas fa-exclamation-circle"></i> {blogErr}</small>}
                <button className={styles.editBtn}>변경</button>
                <label>블로그 이름
                    <input type="text" required value={blogName} onChange={handleBlogName} maxLength="25" />
                </label>
                <label>블로그 소개글
                    <textarea value={introduction} onChange={handleIntroduction} />
                </label>
            </form>
        </article>
    )
}

export default SetBlog