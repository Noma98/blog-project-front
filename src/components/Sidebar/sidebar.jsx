import React from 'react'
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

function Sidebar({ api, onFetchUser, user }) {
    const handleAdd = async () => {
        await api.makeFolder();
        onFetchUser();
    }
    return (
        <div className={styles.sidebar}>
            <button className={styles.posts}>
                <Link to="/posts">ALL POSTS</Link>
            </button>
            <nav>
                <ul>
                    {user ? (
                        user.folders && user.folders.map(folder => {
                            return <li key={folder._id} data-id={folder._id}>{folder.name}</li>
                        })
                    ) : (
                        <>
                            <li>Sample Folder 1</li>
                            <li>Sample Folder 2</li>
                            <li>Sample Folder 3</li>
                            <li>Sample Folder 4</li>
                        </>
                    )
                    }
                </ul>
            </nav>
            {user && <button className={styles.addBtn} onClick={handleAdd}>
                ➕ Add Folder
            </button>}
        </div>
    )
}

export default Sidebar
