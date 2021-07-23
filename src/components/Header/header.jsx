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
            <Link to="/">
                <h3>nomab.log</h3>
            </Link>
            <ul className={styles.nav}>
                {user ? (
                    <>
                        <li className={styles.logout} onClick={handleLogout}>
                            <button>
                                Logout
                            </button>
                        </li>
                        <li>
                            <Link to="/user/edit"><i className="fas fa-user-edit"></i></Link>
                        </li>
                        <li>
                            <Link to="/blog/edit"><i className="fas fa-cog"></i></Link>
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
            <form className={styles.searchForm}>
                <input className={styles.search} type="text" placeholder="Search Docs..." />
            </form>
        </header>
    )
}

export default Header
