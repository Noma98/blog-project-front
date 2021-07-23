import React from 'react'
import Post from '../../components/Post/post';
import styles from './viewPosts.module.css';

const tests = [1, 2, 3, 4, 5];
function ViewPosts() {
    return (
        <div className={styles.posts}>
            <div className={styles.header}>
                <h1>All Posts
                </h1>
                <button><i className="fas fa-ellipsis-v"></i></button>
            </div>
            <div>
                {tests.map(test => {
                    return <Post key={test} />
                })}
            </div>
            <div className={styles.navBtn}>
                <button>1</button>
                <button>2</button>
            </div>
        </div>
    )
}

export default ViewPosts;
