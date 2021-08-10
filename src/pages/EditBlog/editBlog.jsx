import React, { useState } from 'react'
import styles from "../EditUser/edit.module.css";

function EditBlog({ user, api, onFetchUser }) {
    const [name, setName] = useState(user.blogInfo.name);
    const [introduction, setIntroduction] = useState(user.blogInfo.introduction);
    const [err, setErr] = useState(null);

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleIntroduction = (e) => {
        setIntroduction(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        const response = await api.updateBlogInfo({ userId: user._id, introduction, name });
        if (!response.success) {
            setErr(response.message);
            return;
        }
        onFetchUser();
        alert("변경이 완료되었습니다.");
    }
    return (
        <div className={styles.edit}>
            <form onSubmit={handleSubmit} className={styles.editBlog}>
                <h2>블로그 정보</h2>
                {err && <small>
                    <i className="fas fa-exclamation-circle"></i> {err}</small>}
                <button className={styles.editBtn}>변경</button>
                <label>블로그 이름
                    <input type="text" required value={name} onChange={handleName} maxLength="25" />
                </label>
                <label>블로그 소개글
                    <textarea value={introduction} onChange={handleIntroduction} />
                </label>
            </form>
        </div>
    )
}

export default EditBlog
