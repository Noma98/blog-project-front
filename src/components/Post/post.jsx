import React from 'react'
import styles from './post.module.css';

function Post() {
    return (
        <div className={styles.post}>
            <h3>포스팅 제목</h3>
            <small>생성 날짜</small>
            <div className={styles.tags}>
                <span>태그1</span>
                <span>태그2</span>
                <span>태그3</span>
            </div>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique natus sapiente, ab magnam cum, mollitia soluta itaque odit omnis amet debitis ex inventore. Recusandae dolorum excepturi distinctio aliquid nihil fuga.</p>
        </div>
    )
}

export default Post
