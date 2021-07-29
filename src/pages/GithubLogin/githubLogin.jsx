import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './githubLogin.module.css';

function GithubLogin({ api, onLogin }) {
    const history = useHistory();

    //깃헙이 전달해준 code 추출
    const params = new URLSearchParams(useLocation().search);
    const code = params.get("code");

    useEffect(() => {
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
    return (
        <div className={styles.container}>
            <div className={styles.loading}></div>
        </div>
    );
}

export default GithubLogin
