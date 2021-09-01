import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Loading from '../../components/Loading/loading';
import styles from './socialLogin.module.css';

function SocialLogin({ api, onfetchLoginData }) {
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState(null); //unlink시 필요
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const provider = location.pathname.split("/")[3];

    const search = location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");

    useEffect(() => {
        if (provider !== "github") {
            return;
        }
        const loginGithub = async () => {
            setLoading(true);
            const data = await api.loginGithub(code);
            if (data.success === true) {
                await onfetchLoginData();
                history.push(`/@${data.payload.name}`);
            } else if (data.success === "join") {
                const { email, name, avatar } = data.payload;
                history.push({
                    pathname: "/join",
                    state: { email, name, avatar }
                });
            } else {
                alert(data.message);
                history.push("/login");
            }
        }
        loginGithub();
    }, [api, onfetchLoginData, provider, code, history])

    useEffect(() => {
        if (provider !== "kakao") {
            return;
        }
        const loginKakao = async () => {
            setLoading(true);
            const data = await api.loginKakao(code);
            if (data.success === true) {
                await onfetchLoginData();
                history.push(`/@${data.payload.name}`);
            } else if (data.success === "join") {
                const { email, name, avatar } = data.payload;
                history.push({
                    pathname: "/join",
                    state: { email, name, avatar }
                });
            } else {
                setAccessToken(data.token);
                setLoading(false);
                setError(data.error);
            }
        }
        loginKakao();
    }, [api, onfetchLoginData, provider, code, history])

    useEffect(() => {
        if (provider !== "naver") {
            return;
        }
        const loginNaver = async () => {
            if (!location.hash) {
                // 동의 화면에서 "취소" 버튼 클릭시
                history.push("/login");
                return;
            }
            setLoading(true);
            const token = location.hash.split("=")[1].split("&")[0];
            const data = await api.naverLogin(token);
            if (data.success === true) {
                await onfetchLoginData();
                history.push(`/@${data.payload.name}`);
            } else if (data.success === "join") {
                const { name, avatar, email } = data.payload;
                history.push({
                    pathname: "/join",
                    state: { name, avatar, email }
                })
            } else {
                setAccessToken(data.token);
                setLoading(false);
                setError(data.error);
            }
        }
        loginNaver();
    }, [api, onfetchLoginData, location.hash, provider, history])

    const kakaoUnlink = async () => {
        setLoading(true);
        const data = await api.kakaoUnlink(accessToken);
        setLoading(false);
        if (!data.success) {
            setError(data.error);
            return;
        }
        history.push("/login");
    }
    const naverUnlink = async () => {
        setLoading(true);
        const data = await api.naverUnlink(accessToken);
        setLoading(false);
        if (!data.success) {
            setError(data.error);
            return;
        }
        history.push("/login");
    }

    return (
        <section className={styles.section}>
            {loading ? <Loading />
                : <>
                    {error &&
                        <div className={styles.container}>
                            <div className={styles.notice}>
                                <h2><i className="fas fa-exclamation-triangle"></i> {error.title}</h2>
                                <p>{error.message}</p>
                                <div className={styles.btns}>
                                    <button>
                                        <Link to="/login">1. 로그인 페이지로 돌아가 다른 방법으로 로그인 하기</Link>
                                    </button>

                                    <button onClick={provider === "kakao" ? kakaoUnlink : naverUnlink}>{`2. 정보 제공에 동의하기 : ${provider}와 연결 끊기 후 재동의 진행`}</button>
                                    <small>개인정보 동의 화면을 다시 띄우기 위해서 필요한 절차입니다. 해당 버튼을 클릭하면 연결이 끊기고 로그인 화면으로 이동됩니다. 처음부터 다시 진행하시고, 정보 제공에 꼭 동의해주세요.</small>
                                </div>
                            </div>
                        </div>
                    }
                </>}
        </section>
    );
}

export default SocialLogin
