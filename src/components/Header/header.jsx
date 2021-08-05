import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TabletAndMobile } from '../../common/mediaQuery';
import styles from './header.module.css';

function Header({ api, onLogout, user, onToggle }) {
    const history = useHistory();
    const [visible, setVisible] = useState(false);

    const handleLogout = async () => {
        if (!window.confirm("정말 로그아웃하시겠습니까?")) {
            return;
        }
        const response = await api.getLogout();
        if (response.success) {
            onLogout();
            history.push("/login");
        } else {
            alert("⛔ 로그아웃 실패");
        }
    }
    const handleQuery = (e) => {
        const value = e.target.value;
        if (value === "") {
            history.push("/");
        } else {
            history.push(`/posts?folder=all&query=${value}`);
        }
    }
    const handleVisible = () => {
        setVisible(!visible);
    }
    return (
        <header className={styles.header}>

            <Link to="/">
                <h3>nomab.log</h3>
            </Link>

            <div className={styles.flexRow}>
                <input className={styles.search} onChange={handleQuery} type="text" placeholder="Search Docs..." />
                <nav className={styles.nav}>
                    {user &&
                        <>
                            <ul className={`${styles.lists} ${visible && styles.visible}`}>
                                <li className={styles.logout} onClick={handleLogout}>
                                    <button>
                                        <i className="fas fa-sign-out-alt"></i>
                                    </button>
                                </li>
                                <li>
                                    <Link to="/user/edit"><i className="fas fa-user-edit"></i></Link>
                                </li>
                            </ul>
                            <TabletAndMobile>
                                <button className={styles.settings} onClick={handleVisible}>
                                    <i className="fas fa-cog"></i>
                                </button>
                            </TabletAndMobile>

                        </>
                    }

                </nav>

                <TabletAndMobile>
                    <button className={styles.toggle}><i className="fas fa-bars" onClick={onToggle}></i></button>
                </TabletAndMobile>
            </div>
        </header>
    )
}

export default Header
