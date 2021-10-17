import React, { useEffect, useState } from 'react'
import styles from './signInUp.module.css';
import { Link, useHistory } from 'react-router-dom';
import withAuth from '../../hoc/withAuth';
import Google from '../../components/Google/google';
import Naver from '../../components/Naver/naver';
import kakaoImage from '../../assets/images/kakao.png';
import useInputs from '../../hooks/useInputs';

function Login({ api, onfetchLoginData }) {
    const [{ email, pwd }, onChange] = useInputs({
        email: '',
        pwd: '',
    })
    const [err, setErr] = useState(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        const response = await api.login({ email, pwd });
        if (!response.success) {
            setErr(response.message);
            return;
        }
        await onfetchLoginData();
        history.push(`/@${response.payload.name}`);
    }
    useEffect(() => {
        localStorage.removeItem("user");
    }, [])
    return (
        <section className={styles.signInUp}>
            <h1>Sign in <span className={styles.logo}>noma's blog</span></h1>
            <small>아직 계정이 없으십니까? <Link to="/join" className={styles.join}>가입하러 가기</Link></small>
            <br />
            {err && <small className={styles.err}><i className="fas fa-exclamation-circle"></i> {err}</small>}
            <form onSubmit={handleSubmit} onChange={onChange} className={styles.loginForm}>
                <label>이메일 주소
                    <input name="email" type="email" required value={email} />
                </label>
                <label>비밀번호 (6자 이상)
                    <input name="pwd" type="password" required value={pwd} minLength="6" />
                </label>
                <input className={styles.loginBtn} type="submit" value="Login" />
            </form>
            <div className={styles.line}></div>
            <div className={styles.socialLogin}>
                <a href={process.env.REACT_APP_GITHUB_OAUTH_URI} className={`${styles.social} ${styles.github}`}><i className="fab fa-github"></i>Github 계정으로 로그인</a>

                <a className={`${styles.social} ${styles.kakao}`} href={process.env.REACT_APP_KAKAO_OAUTH_URI}><img src={kakaoImage} alt="kakao"></img>카카오 아이디로 로그인</a>
                <Google api={api} onfetchLoginData={onfetchLoginData} />
                <Naver />
            </div>
        </section>
    )
}
export default withAuth(Login, false);
