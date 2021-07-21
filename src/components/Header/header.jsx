import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <Link to="/"><h3>blog name</h3></Link>
            <ul className={styles.menu}>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/join">Join</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>
            <form>
                <input className={styles.search} type="text" placeholder="Search Docs..." />
            </form>
        </header>
    )
}

export default Header
