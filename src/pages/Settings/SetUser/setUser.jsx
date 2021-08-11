import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styles from "../settings.module.css";

function SetUser({ api, user, onFetchLoginData }) {
    const [name, setName] = useState(user.name);
    const [imgBase64, setImgBase64] = useState(user.avatar || null);

    const [userErr, setUserErr] = useState(null);

    const formRef = useRef();
    const history = useHistory();

    const handleName = (e) => {
        setName(e.target.value);
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
    }

    const submitUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        formData.append("userId", user._id);
        const data = await api.updateUser(formData);
        if (!data.success) {
            setUserErr(data.message);
            return;
        }
        alert("변경이 완료되었습니다.");
        onFetchLoginData();
        history.push(`/@${name.toLowerCase().replaceAll(" ", "")}/user/settings`);
    }

    return (
        <div className={styles.edit}>
            <form ref={formRef} className={styles.editUser} onSubmit={submitUser}>
                <h2>회원 정보</h2>
                {userErr && <small>
                    <i className="fas fa-exclamation-circle"></i> {userErr}</small>}
                <button className={styles.editBtn}>변경</button>

                <label>이메일 (변경 불가)
                    <input name="email" value={user.email} disabled />
                </label>
                <label>닉네임 (영문/숫자/밑줄 문자(_)만 사용 가능)
                    <input name="name" type="text" value={name} onChange={handleName} maxLength="20" required />
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
        </div >

    )
}

export default SetUser
