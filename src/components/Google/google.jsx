import React from 'react'
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import * as config from '../../config';
import styles from './google.module.css';

function Google({ api, onLogin }) {
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
            alert(`${data.error.title}: ${data.error.message}`);
            return;
        }
        onLogin();
        history.push("/");
    }
    const onFailure = (error) => {
        console.log(error);
        alert(`로그인 에러: ${error}`);
    }
    return (
        <GoogleLogin
            clientId={config.GOOGLE_CLIENT}
            render={renderProps => (
                <button className={styles.google} onClick={renderProps.onClick} disabled={renderProps.disabled}><img src="/images/google.png"></img>Login with Google</button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default Google
