import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styles from './socialLogin.module.css';

function SocialLogin({ api, onLogin }) {
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
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
                setError(data.error);
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
                setAccessToken(data.token);
                setError(data.error);
            }
        }
        loginKakao();
    }, [code, history])

    const handleUnlink = async () => {
        setError(null);
        const data = await api.kakaoUnlink(accessToken);
        if (!data.success) {
            setError(data.error);
            return;
        }
        history.push("/login");
    }

    return (
        <div className={styles.container}>
            {!error ? (
                <div className={styles.spinner}></div>
            ) : (
                <div className={styles.notice}>
                    <h1><i className="fas fa-exclamation-triangle"></i> {error.title}</h1>
                    <pre>{error.message}</pre>
                    <div className={styles.btns}>
                        <button>
                            <Link to="/login">1. 로그인 페이지로 돌아가 다른 방법으로 로그인 하기</Link>
                        </button>

                        <button onClick={handleUnlink}>2. 정보 제공에 동의하기 : 카카오와 연결 끊기 후 재동의 진행</button>
                        <small>개인정보 동의 화면을 다시 띄우기 위해서 필요한 절차입니다. 해당 버튼을 클릭하면 연결이 끊기고 로그인 화면으로 이동됩니다. 처음부터 다시 진행하시고, 정보 제공에 꼭 동의해주세요.</small>

                    </div>

                </div>
            )}
        </div>

    );
}

export default SocialLogin