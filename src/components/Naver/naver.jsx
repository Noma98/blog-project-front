import React, { useEffect, useRef } from 'react'
import styles from './naver.module.css';
import naverImage from '../../assets/images/naver.jpg';

function Naver() {
    const naverRef = useRef();
    useEffect(() => {
        const naverScript = document.createElement("script");
        naverScript.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
        naverScript.type = "text/javascript";
        document.head.appendChild(naverScript);

        naverScript.onload = () => {
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId: process.env.REACT_APP_NAVER_CLIENT,
                callbackUrl: "http://localhost:3000/oauth/callback/naver",
                callbackHandle: true,
                isPopup: false,
                loginButton: {
                    color: "green",
                    type: 3,
                    height: 55,
                }
            });
            naverLogin.init();
            naverLogin.logout(); //네이버 로그인이 계속 유지되는 경우가 있음, 초기화시 로그아웃
        }
    }, [])
    const handleClick = () => {
        naverRef.current.children[0].click();
    }
    return (
        <>
            <div ref={naverRef} id="naverIdLogin"></div>
            <button onClick={handleClick} className={styles.naver} >
                <img src={naverImage} alt="naver" />
                네이버로 로그인하기
            </button>
        </>
    )
}

export default Naver
