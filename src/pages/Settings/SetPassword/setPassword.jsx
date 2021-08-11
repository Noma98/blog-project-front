import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import styles from "../settings.module.css";

function SetPassword({ api, user, onFetchUser }) {

    const [pwd, setPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [newPwd2, setNewPwd2] = useState("");

    const [pwdErr, setPwdErr] = useState(null);

    const history = useHistory();

    const handlePwd = (e) => {
        setPwd(e.target.value);
    }
    const handleNewPwd = (e) => {
        setNewPwd(e.target.value);
    }
    const handleNewPwd2 = (e) => {
        setNewPwd2(e.target.value);
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
        alert("변경이 완료되었습니다.");
        onFetchUser();
    }
    const handleWithdraw = async () => {
        if (!window.confirm("정말로 삭제하시겠습니까?")) {
            return;
        }
        const response = await api.deleteUser(user._id);
        if (!response.success) {
            alert(response.message);
            return;
        }
        alert("성공적으로 삭제했습니다.");
        history.push({
            pathname: "/",
            state: { withdraw: true }
        });
    }

    return (
        <div className={styles.edit}>
            {user.socialOnly ? (
                <small>소셜 로그인 회원은 비밀번호가 없습니다.</small>
            ) : (
                <form className={styles.editPwd} onSubmit={submitPwd}>
                    <h2>비밀번호</h2>
                    {pwdErr && <small>
                        <i className="fas fa-exclamation-circle"></i> {pwdErr}</small>}
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
            <button onClick={handleWithdraw} className={styles.withdraw}>회원 탈퇴</button>
        </div >

    )
}

export default SetPassword
