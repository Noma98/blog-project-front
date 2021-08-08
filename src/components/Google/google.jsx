import React from 'react'
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import * as config from '../../config';
import styles from './google.module.css';

function Google({ api, onfetchLoginData }) {
    const history = useHistory();
    const onSuccess = async (response) => {
        const {
            profileObj: {
                email,
                name,
                imageUrl: avatar
            }
        } = response;
        const data = await api.googleLogin({ email, name, avatar });
        if (!data.success) {
            alert("로그인 실패");
            return;
        }
        await onfetchLoginData();
        history.push(`/@${data.payload.name}`);
    }
    const onFailure = (error) => {
        if (error.error === "popup_closed_by_user") {
            return;
        }
        alert("로그인 실패");
    }
    return (
        <GoogleLogin
            clientId={config.GOOGLE_CLIENT}
            render={renderProps => (
                <button className={styles.google} onClick={renderProps.onClick} disabled={renderProps.disabled}><img src="/images/google.png" alt="google"></img>구글로 로그인하기</button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default Google
