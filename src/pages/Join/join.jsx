import React, { useRef, useState } from 'react'
import styles from './join.module.css';
import { useHistory } from 'react-router-dom';
import withAuth from '../../hoc/withAuth';

function Join({ api }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");
    const [err, setErr] = useState(null);
    const history = useHistory();
    const formRef = useRef();

    const handleSubmit = async (e) => {
        setErr(null);
        e.preventDefault();
        if (pwd !== pwd2) {
            setErr("비밀번호를 확인해주세요.");
            return;
        }
        const data = await api.postJoin({ email, pwd, name });
        if (!data.success) {
            setErr(data.message);
        }
        history.push("/login");

    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handlePwd = (e) => {
        setPwd(e.target.value);
    }
    const handlePwd2 = (e) => {
        setPwd2(e.target.value);
    }
    return (
        <div className={styles.join}>
            <h1>회원가입</h1>
            {err && <small>
                <i class="fas fa-exclamation-circle"></i> {err}</small>}
            <form onSubmit={handleSubmit} ref={formRef} className={styles.joinForm}>
                <label>이메일
                    <input type="email" required value={email} onChange={handleEmail} />
                </label>
                <label>이름
                    <input type="text" required value={name} onChange={handleName} maxLength="10" />
                </label>
                <label>비밀번호 (6자 이상)
                    <input type="password" required value={pwd} minLength="6" onChange={handlePwd} />
                </label>
                <label>비밀번호 확인
                    <input type="password" required value={pwd2} onChange={handlePwd2} />
                </label>
                <input className={styles.joinBtn} type="submit" value="Join" />
            </form>
        </div >
    )
}

export default withAuth(Join, false);
