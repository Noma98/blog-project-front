import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styles from "./edit.module.css";

function EditUser({ api, user, onFetchUser }) {
    const [name, setName] = useState(user.name);
    const [file, setFile] = useState(null);
    const [imgBase64, setImgBase64] = useState(null);

    const [pwd, setPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [newPwd2, setNewPwd2] = useState("");

    const [userErr, setUserErr] = useState(null);
    const [pwdErr, setPwdErr] = useState(null);


    const formRef = useRef();
    const history = useHistory();

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

    const handleFile = (e) => {
        let reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            if (base64) {
                setImgBase64(base64.toString());
            }
        }
        if (!e.target.files[0]) {
            return;
        }
        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    const submitUser = async (e) => {
        e.preventDefault();
        setUserErr(null);
        const formData = new FormData(formRef.current);
        formData.append("userId", user._id);
        const data = await api.updateUser(formData);
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
        alert("변경 완료");
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
            <form ref={formRef} className={styles.editUser} onSubmit={submitUser}>
                <h2>회원 정보</h2>
                {userErr && <small>
                    <i className="fas fa-exclamation-circle"></i> {userErr}</small>}
                <button className={styles.editBtn}>변경</button>

                <label>이메일(변경 불가)
                    <input name="email" value={user.email} disabled />
                </label>
                <label>이름
                    <input name="name" type="text" value={name} onChange={handleName} maxLength="10" required />
                </label>
                <label htmlFor="avatar">프로필 이미지</label>
                {imgBase64 ?
                    <img src={imgBase64} alt="profile" className={styles.preview} />
                    :
                    <div className={styles.container}>
                        미리보기
                    </div>}
                <input type="file" accept="image/*" name="avatar" id="avatar" onChange={handleFile} />
            </form>

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

export default EditUser
