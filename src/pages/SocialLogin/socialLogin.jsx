import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './socialLogin.module.css';

function SocialLogin({ api, onLogin }) {
    const history = useHistory();
    const location = useLocation();
    const path = location.pathname;
    const search = location.search;

    const params = new URLSearchParams(search);
    const code = params.get("code");

    useEffect(() => {
        if (path !== "/oauth/callback/github") {
            return;
        }
        const loginGithub = async () => {
            const data = await api.loginGithub(code);
            if (data.success) {
                onLogin();
                history.push("/");
            } else {
                history.push("/login");
                alert(data.message);
            }
        }
        loginGithub();
    }, [code, history])

    useEffect(() => {
        if (path !== "/oauth/callback/kakao") {
            return;
        }
        const loginKakao = async () => {
            const data = await api.loginKakao(code);
            if (data.success) {
                onLogin();
                history.push("/");
            } else {
                history.push("/login");
                alert(data.message);
            }
        }
        loginKakao();
    }, [code, history])

    return (
        <div className={styles.container}>
            <div className={styles.loading}></div>
        </div>
    );
}

export default SocialLogin
