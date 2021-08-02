import React, { useRef, useState } from 'react'
import styles from "./editUser.module.css";

function EditUser({ api, user, onFetchUser }) {
    const [name, setName] = useState(user.name);
    const [pwd, setPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [newPwd2, setNewPwd2] = useState("");
    const [userErr, setUserErr] = useState(null);
    const [pwdErr, setPwdErr] = useState(null);
    const formRef = useRef();
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handlePwd = (e) => {
        setPwd(e.target.value);
    }
    const handleNewPwd = (e) => {
        setNewPwd(e.target.value);
    }
    const handleNewPwd2 = (e) => {
        setNewPwd2(e.target.value);
    }
    const submitUser = async (e) => {
        e.preventDefault();
        setUserErr(null);
        const data = await api.updateUser({ userId: user._id, name });
        if (!data.success) {
            setUserErr(data.message);
            return;
        }
        alert("변경 완료");
        onFetchUser();
    }
    const submitPwd = async (e) => {
        e.preventDefault();
        setPwdErr(null);
        if (newPwd !== newPwd2) {
            setPwdErr("새 비밀번호를 동일하게 입력하세요.");
            return;
        }
        const data = await api.updatePwd({ userId: user._id, pwd, newPwd });
        if (!data.success) {
            setPwdErr(data.message);
            return;
        }
        formRef.current.reset();
        alert("변경 완료");
        onFetchUser();
    }

    return (
        <div className={styles.edit}>
            <form className={styles.editUser} onSubmit={submitUser}>
                <h2>회원정보</h2>
                {userErr && <small>
                    <i class="fas fa-exclamation-circle"></i> {userErr}</small>}
                <button className={styles.editBtn}>변경</button>

                <label>이메일(변경 불가)
                    <input value={user.email} readOnly />
                </label>
                <label>이름
                    <input type="text" value={name} onChange={handleName} maxLength="10" required />
                </label>
            </form>

            {user.socialOnly ? (
                <small>소셜 로그인 회원은 비밀번호가 없습니다.</small>
            ) : (
                <form ref={formRef} className={styles.editPwd} onSubmit={submitPwd}>
                    <h2>비밀번호</h2>
                    {pwdErr && <small>
                        <i class="fas fa-exclamation-circle"></i> {pwdErr}</small>}
                    <button className={styles.editBtn} >변경</button>
                    <label>현재 비밀번호
                        <input type="password" value={pwd} minLength="6" onChange={handlePwd} required />
                    </label>
                    <label>새 비밀번호 (6자 이상)
                        <input type="password" value={newPwd} minLength="6" onChange={handleNewPwd} required />
                    </label>
                    <label>새 비밀번호 확인
                        <input type="password" value={newPwd2} onChange={handleNewPwd2} required />
                    </label>
                </form>
            )}
        </div >
    )
}

export default EditUser
