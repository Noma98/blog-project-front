import React, { memo, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { TabletAndMobile } from '../../common/mediaQuery';
import styles from './header.module.css';

const Header = memo(({ api, onToggle, onFetchLoginData, user, isLoggedIn }) => {
    const path = useLocation().pathname;
    const history = useHistory();
    const [visible, setVisible] = useState(false);

    const handleLogout = async () => {
        if (!window.confirm("정말 로그아웃하시겠습니까?")) {
            return;
        }
        const response = await api.getLogout();
        if (response.success) {
            window.localStorage.removeItem("isLoggedIn");
            onFetchLoginData();
        } else {
            alert("⛔ 로그아웃 실패");
        }
    }
    const handleQuery = (e) => {
        const value = e.target.value;
        if (value === "") {
            history.push(`/@${user?.name}`);
        } else {
            history.push(`/@${user?.name}/posts?query=${value}`);
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
                {user &&
                    <input className={styles.search} onChange={handleQuery} type="text" placeholder="Search Docs..." />}
                <nav className={styles.nav}>
                    <ul className={`${styles.lists} ${visible && styles.visible}`}>
                        {
                            isLoggedIn ? <>
                                <li className={styles.logout} onClick={handleLogout}>
                                    <button>
                                        <i className="fas fa-sign-out-alt"></i>
                                    </button>
                                </li>
                                {user && path.match(`/@${isLoggedIn?.name}`) && <li>
                                    <Link to={`/@${isLoggedIn?.name}/user/edit`}><i className="fas fa-user-edit"></i></Link>
                                </li>}
                                <li>
                            <Link to={`/@${user.name}/user/edit`}><i className="fas fa-user-edit"></i></Link>
                                </li>
                            </> : <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/join">Join</Link>
                                </li>
                            </>
                        }
                    </ul>
                    <TabletAndMobile>
                        <button className={styles.settings} onClick={handleVisible}>
                            <i className="fas fa-cog"></i>
                        </button>
                    </TabletAndMobile>
                </nav>

                {
                    user &&
                    <TabletAndMobile>
                        <button className={styles.toggle}><i className="fas fa-bars" onClick={onToggle}></i></button>
                    </TabletAndMobile>
                }
            </div>
        </header >
    )
})

export default Header
