import React, { useRef, useState } from 'react'
import styles from './login.module.css';
import { Link, useHistory } from 'react-router-dom';
import withAuth from '../../hoc/withAuth';
import * as config from '../../config';
import Google from '../../components/Google/google';
import Naver from '../../components/Naver/naver';


function Login({ api, onLogin }) {
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
        onLogin();
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
            <h1>로그인</h1>
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
            <div className={styles.line}></div>
            <div className={styles.socialLogin}>
                <a href={`https://github.com/login/oauth/authorize?client_id=${config.GITHUB_DEV_CLIENT}&scope=read%3Auser+user%3Aemail`} className={`${styles.social} ${styles.github}`}><i className="fab fa-github"></i>Login with Github</a>

                <a className={`${styles.social} ${styles.kakao}`} href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${config.KAKAO_API_KEY}&redirect_uri=http://localhost:3000/oauth/callback/kakao&state=${config.KAKAO_STATE}`}><img src="/images/kakao.png"></img>Login with Kakao</a>
                <Google api={api} onLogin={onLogin} />
                <Naver />
            </div>

        </div>
    )
}
export default withAuth(Login, false);
