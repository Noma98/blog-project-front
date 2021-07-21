import React from 'react'
import styles from './sidebar.module.css';

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <nav className={styles.nav}>
                <ul>
                    <li className={styles.menu}>
                        THE DOCUMENTAION
                    </li>
                    <li>
                        Sample Menu 1
                    </li>
                    <li>
                        Sample Menu 2
                    </li>
                    <li>
                        Sample Menu 3
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
