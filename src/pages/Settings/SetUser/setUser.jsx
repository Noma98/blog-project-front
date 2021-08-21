import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import ImageUploader from '../../../components/ImageUploader/imageUploader';
import styles from "../settings.module.css";

function SetUser({ api, user, onFetchLoginData }) {
    const [name, setName] = useState(user.name);
    const [image, setImage] = useState(user.avatar || {});//object일 때만 업데이트
    const [userErr, setUserErr] = useState(null);
    const history = useHistory();

    const handleName = (e) => {
        setName(e.target.value);
    }

    const submitUser = async () => {
        const formData = new FormData();
        formData.append("avatar", image);
        formData.append("name", name);
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
            <div className={styles.editUser} >
                <h2>회원 정보</h2>
                {userErr && <small>
                    <i className="fas fa-exclamation-circle"></i> {userErr}</small>}
                <button className={styles.editBtn} onClick={submitUser}>변경</button>

                <label>이메일 (변경 불가)
                    <input value={user.email} disabled />
                </label>
                <label>닉네임 (영문/숫자/밑줄 문자(_)만 사용 가능)
                    <input type="text" value={name} onChange={handleName} maxLength="20" required />
                </label>
                <div className={styles.uploader}>
                    <ImageUploader name="avatar" label="프로필 이미지" setImage={setImage} prevImg={user.avatar} />
                </div>
            </div>
        </div >

    )
}

export default SetUser
