import React, { useRef, useState } from 'react'
import styles from './login.module.css';
import { Link, useHistory } from 'react-router-dom';
import withAuth from '../../hoc/withAuth';

function Login({ api }) {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [err, setErr] = useState(null);
    const history = useHistory();
    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        const response = await api.postLogin({ email, pwd });
        if (!response.success) {
            setErr(response.message);
            return;
        }
        history.push("/");

    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePwd = (e) => {
        setPwd(e.target.value);
    }
    return (
        <div className={styles.login}>
            <h2>로그인</h2>
            <small>아직 계정이 없으십니까? <Link to="/join" className={styles.join}>가입하기</Link></small>
            {err && <small className={styles.err}><i className="fas fa-exclamation-circle"></i> {err}</small>}
            <form onSubmit={handleSubmit} ref={formRef} className={styles.loginForm}>
                <label>Email
                    <input type="email" required value={email} onChange={handleEmail} />
                </label>
                <label>Password
                    <input type="password" required value={pwd} minLength="6" onChange={handlePwd} />
                </label>
                <input className={styles.loginBtn} type="submit" value="Login" />
            </form>
        </div>
    )
}
export default withAuth(Login, false);
