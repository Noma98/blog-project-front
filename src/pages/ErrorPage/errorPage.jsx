import React from 'react'
import { Link } from 'react-router-dom';
import styles from './errorPage.module.css';

function ErrorPage({ statusCode }) {
    return (
        <article className={styles.notFound}>
            <h1>{statusCode === "404" ? "404 Not Found" : "403 Forbidden"}</h1>
            <p>{`${statusCode === "404" ? "올바르지 않은 경로입니다." : "접근할 수 있는 권한이 없습니다."} 홈 화면으로 돌아가세요.`}</p>
            <Link to="/">Go back to home →</Link>
        </article>
    )
}

export default ErrorPage
