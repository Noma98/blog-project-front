import React, { useRef, useState } from 'react'
import styles from '../Login/signInUp.module.css';
import { Link, useHistory } from 'react-router-dom';
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
            return;
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
        <div className={`${styles.signInUp} ${styles.tight}`}>
            <h1>Sign up <span className={styles.logo}>nomab.log</span></h1>
            <small>계정이 이미 있으십니까? <Link to="/login" className={styles.login}>로그인하러 가기</Link></small>
            <br />
            {err && <small className={styles.err}><i class="fas fa-exclamation-circle"></i> {err}</small>}
            <form onSubmit={handleSubmit} ref={formRef} className={styles.joinForm}>
                <label>이메일 주소
                    <input type="email" required value={email} onChange={handleEmail} />
                </label>
                <label>이름 (닉네임)
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
