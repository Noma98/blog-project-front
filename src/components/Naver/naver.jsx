import React, { useEffect } from 'react'
import * as config from '../../config';


function Naver() {
    useEffect(() => {
        const naverScript = document.createElement("script");
        naverScript.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js";
        naverScript.type = "text/javascript";
        document.head.appendChild(naverScript);

        naverScript.onload = () => {
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId: config.NAVER_CLIENT,
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

    return (
        <div id="naverIdLogin"></div>
    )
}

export default Naver
