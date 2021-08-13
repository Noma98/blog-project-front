import React, { memo, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { TabletAndMobile } from '../../common/mediaQuery';
import styles from './header.module.css';
import Tooltip from 'react-tooltip-lite';

const Header = memo(({ api, onToggle, onFetchLoginData, user, isLoggedIn }) => {
    const path = useLocation().pathname;
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const handleLogout = async () => {
        if (!window.confirm("정말 로그아웃하시겠습니까?")) {
            return;
        }
        const response = await api.logout();
        if (response.success) {
            window.localStorage.removeItem("isLoggedIn");
            onFetchLoginData();
        } else {
            alert("로그아웃에 실패하였습니다.");
        }
    }
    const handleQuery = (e) => {
        const value = e.target.value;
        //전체에서 검색, 유저데이터에서 검색
        if (value === "") {
            user && history.push(`/@${user.name}`);
            !user && history.push("/");
        } else {
            user && history.push(`/@${user.name}/posts?query=${value}`);
            !user && history.push(`/posts?query=${value}`);
        }
    }
    const handleVisible = () => {
        setVisible(!visible);
    }
    const handleLogo = async () => {
        localStorage.removeItem("user");
        history.push("/");
    }
    return (
        <header className={styles.header}>
            <h3 onClick={handleLogo}>Nomalog</h3>
            <div className={styles.flexRow}>
                <input className={styles.search} onChange={handleQuery} type="text" placeholder="Search Docs..." />
                <nav className={styles.nav}>
                    <ul className={`${styles.lists} ${visible && styles.visible}`}>
                        {
                            isLoggedIn ? <>
                                <Tooltip content="Logout">
                                    <li className={styles.logout} onClick={handleLogout}>
                                        <button>
                                            <i className="fas fa-sign-out-alt"></i>
                                        </button>
                                    </li>
                                </Tooltip>
                                {user && path.match(`/@${isLoggedIn?.name}`) && <Tooltip content="Settings">
                                    <li>
                                        <Link to={`/@${isLoggedIn?.name}/user/settings`}><i className="fas fa-user-edit"></i></Link>
                                    </li>
                                </Tooltip>}
                                <Tooltip content="My blog">
                                    <li>
                                        <Link to={`/@${isLoggedIn?.name}`}><i className={`fas fa-home ${styles.home}`}></i></Link>
                                    </li>
                                </Tooltip>
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
