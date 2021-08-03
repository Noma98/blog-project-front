import React from 'react'
import { Link } from 'react-router-dom';
import styles from './notFound.module.css';

function NotFound() {
    return (
        <div className={styles.notFound}>
            <h1>404 Not Found</h1>
            <p>올바르지 않은 경로입니다. 홈 화면으로 돌아가세요.</p>
            <Link to="/">Go back to home →</Link>
        </div>
    )
}

export default NotFound
