import React, { useEffect, useRef, useState } from 'react'
import styles from '../Login/signInUp.module.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import withAuth from '../../hoc/withAuth';

function Join({ api }) {
    const history = useHistory();
    const social = useLocation().state;
    const [email, setEmail] = useState(social?.email || "");
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");
    const [err, setErr] = useState(null);
    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pwd !== pwd2) {
            setErr("비밀번호를 확인해주세요.");
            return;
        }
        const data = await api.postJoin({ email: email.toLowerCase().replaceAll(" ", ""), pwd, name: name.toLowerCase().replaceAll(" ", "") });
        if (!data.success) {
            setErr(data.message);
            return;
        }
        alert("가입이 완료되었습니다.");
        history.push("/login");
    }
    const handleSocial = async (e) => {
        e.preventDefault();
        const response = await api.socialJoin({ email, name, avatar: social.avatar });
        if (!response.success) {
            setErr(response.message);
            return;
        }
        alert("가입이 완료되었습니다.");
        history.push("/login");
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleName = (e) => {
        if (e.target.value.match(/\W/)) {
            alert("밑줄 문자를 포함한 영문, 숫자만 사용 가능합니다.")
            return;
        }
        setName(e.target.value);
    }
    const handlePwd = (e) => {
        setPwd(e.target.value);
    }
    const handlePwd2 = (e) => {
        setPwd2(e.target.value);
    }
    useEffect(() => {
        social && setErr("소셜 계정으로부터 받아온 닉네임이 이미 사용 중이거나 조건에 맞지 않습니다.");
    }, [social])

    return (
        <div className={`${styles.signInUp} ${styles.tight}`}>
            <h1>{social ? "Social " : "Sign up "}<span className={styles.logo}>nomab.log</span></h1>
            {social ? <small>사용자 정보를 변경해주세요.</small> : <small>계정이 이미 있으십니까? <Link to="/login" className={styles.login}>로그인하러 가기</Link></small>
            }
            <br />
            {err && <small className={styles.err}><i className="fas fa-exclamation-circle"></i> {err}</small>}
            <form onSubmit={social ? handleSocial : handleSubmit} ref={formRef} className={styles.joinForm}>
                {!social && <label>이메일 주소
                    <input type="email" required value={email} onChange={handleEmail} />
                </label>}
                <label>닉네임 (영문/숫자/밑줄 문자(_)만 사용 가능)
                    <input type="text" required value={name} onChange={handleName} maxLength="20" placeholder={social && `${social.name}은(는) 사용이 불가합니다.`} />
                </label>
                {!social && <>
                    <label>비밀번호 (6자 이상)
                        <input type="password" required value={pwd} minLength="6" onChange={handlePwd} />
                    </label>
                    <label>비밀번호 확인
                        <input type="password" required value={pwd2} onChange={handlePwd2} />
                    </label>
                </>}
                <input className={styles.joinBtn} type="submit" value={social ? "Done" : "Join"} />
            </form>
        </div >
    )
}

export default withAuth(Join, false);
