import React from 'react'
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import styles from './google.module.css';
import googleImage from '../../assets/images/google.png';

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
        if (data.success === true) {
            await onfetchLoginData();
            history.push(`/@${data.payload.name}`);
        } else if (data.succss === "join") {
            history.push({
                pathname: "/join",
                state: { email, name: name.toLowerCase().replace(" ", ""), avatar }
            })
        } else {
            alert("로그인 실패");
            history.push("/login");
        }
    }
    const onFailure = (error) => {
        if (error.error === "popup_closed_by_user") {
            return;
        }
        alert("로그인 실패");
        history.push("/login");
    }
    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT}
            render={renderProps => (
                <button className={styles.google} onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={googleImage} alt="google"></img>구글로 로그인하기</button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default Google
