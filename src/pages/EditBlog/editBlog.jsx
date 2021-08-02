import React, { useState } from 'react'
import styles from "./editBlog.module.css";

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
        alert("성공적으로 변경하였습니다.");
    }
    return (
        <div className={styles.edit}>
            <h1>블로그 정보 수정</h1>
            {err && <small>
                <i class="fas fa-exclamation-circle"></i> {err}</small>}
            <form onSubmit={handleSubmit}>
                <label>블로그 이름
                    <input type="text" required value={name} onChange={handleName} maxLength="25" />
                </label>
                <label>블로그 소개글
                    <textarea required value={introduction} onChange={handleIntroduction} />
                </label>
                <button>적용하기</button>
            </form>
        </div>
    )
}

export default EditBlog
