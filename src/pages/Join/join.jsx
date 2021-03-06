import React, { useEffect, useState } from 'react'
import styles from '../Login/signInUp.module.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import withAuth from '../../hoc/withAuth';
import useInputs from '../../hooks/useInputs';

function Join({ api }) {
    const history = useHistory();
    const social = useLocation().state;
    const [{ email, name, pwd, pwd2 }, onChange] = useInputs({
        email: social?.email || '',
        name: '',
        pwd: '',
        pwd2: '',
    });
    const [err, setErr] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.match(/\W/)) {
            setErr("닉네임은 밑줄 문자를 포함한 영문, 숫자만 사용 가능합니다.")
            return;
        }
        if (!pwd.match(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/)) {
            setErr("비밀번호는 숫자, 영문, 특수문자를 포함한 8자 이상 16자 이하여야 합니다.");
            return;
        }
        if (pwd !== pwd2) {
            setErr("비밀번호를 확인해주세요.");
            return;
        }
        const data = await api.join({ email, pwd, name });
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
    useEffect(() => {
        social && setErr("소셜 계정으로부터 받아온 닉네임이 이미 사용 중이거나 조건에 맞지 않습니다.");
    }, [social])

    return (
        <section className={`${styles.signInUp} ${styles.tight}`}>
            <h1>{social ? "Social " : "Sign up "}<span className={styles.logo}>noma's blog</span></h1>
            {social ? <small>사용자 정보를 변경해주세요.</small> : <small>계정이 이미 있으십니까? <Link to="/login" className={styles.login}>로그인하러 가기</Link></small>
            }
            <br />
            {err && <small className={styles.err}><i className="fas fa-exclamation-circle"></i> {err}</small>}
            <form onChange={onChange} onSubmit={social ? handleSocial : handleSubmit} className={styles.joinForm}>
                {!social && <label>이메일 주소
                    <input name="email" type="email" required value={email} />
                </label>}
                <label>닉네임 (영문/숫자/밑줄 문자(_)만 사용 가능)
                    <input name="name" type="text" required value={name} maxLength="20" placeholder={social && `${social.name}은(는) 사용이 불가합니다.`} />
                </label>
                {!social && <>
                    <label>비밀번호 (숫자, 영문, 특수문자 포함 8자 이상 16자 이하)
                        <input name="pwd" type="password" required value={pwd} minLength="8" maxLength="16" />
                    </label>
                    <label>비밀번호 확인
                        <input name="pwd2" type="password"
                            required value={pwd2} />
                    </label>
                </>}
                <input className={styles.joinBtn} type="submit" value={social ? "Done" : "Join"} />
            </form>
        </section >
    )
}

export default withAuth(Join, false);
