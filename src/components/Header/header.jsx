import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './header.module.css';

function Header({ api, onLogout, user }) {
    const history = useHistory();
    const handleLogout = async () => {
        const response = await api.getLogout();
        if (response.success) {
            onLogout();
            history.push("/");
        } else {
            alert("⛔ 로그아웃 실패");
        }
    }
    return (
        <header className={styles.header}>
            <Link to="/"><h3>{user ? user.blogInfo.blogName : "blog"}</h3></Link>
            <ul className={styles.menu}>
                {user ? (
                    <>
                        <li className={styles.logout} onClick={handleLogout}>
                            Logout
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/join">Join</Link>
                        </li>
                    </>
                )}

            </ul>
            <form>
                <input className={styles.search} type="text" placeholder="Search Docs..." />
            </form>
        </header>
    )
}

export default Header
