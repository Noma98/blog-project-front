import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Post from '../../components/Post/post';
import withAuth from '../../hoc/withAuth'
import styles from './home.module.css';

function Home({ user, api }) {
    const history = useHistory();
    const [post, setPost] = useState(null);

    const handleCreate = () => {
        history.push("/posts/create");
    };
    const fetchData = useCallback(async () => {
        if (user) {
            const latest = await api.fetchLatest(user._id);
            setPost(latest);
        }
    }, [api, user]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <div className={styles.home}>
            {user ? (
                <>
                    <h2>{user.blogInfo.name}</h2>
                    <div className={styles.user}>
                        <img className={styles.avatar} src={user.avatar || "/images/default.PNG"} alt="user avatar" />
                        <div className={styles.info}>
                            <h3>{user.name}</h3>
                            <p>Hi, I'm noma! I like pizza 🍕</p>
                        </div>
                    </div>
                    <div className={styles.latest}>
                        <div className={styles.latestHeader}>
                            <h2>Latest Posts</h2>
                            <button onClick={handleCreate}><i className="fas fa-edit"></i></button>
                        </div>
                        {post && <Post post={post} api={api} user={user} />}
                    </div>
                </>
            ) : (
                <>
                    <h2>Log in and write your own writing!</h2>
                </>
            )}
        </div>
    )
}

export default withAuth(Home, null);
