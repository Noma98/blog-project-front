import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Post from '../../components/Post/post';
import styles from './home.module.css';
import defaultImage from '../../assets/images/default.PNG';

function Home({ user, api, isLoggedIn }) {
    const history = useHistory();
    const [post, setPost] = useState(null);

    const handleCreate = () => {
        history.push(`/@${user.name}/posts/create`);
    };
    useEffect(() => {
        if (!user) {
            return;
        }
        const fetchData = async () => {
            const latest = await api.fetchLatest(user._id);
            setPost(latest);
        }
        fetchData();
    }, [api, user]);
    return (
        <section className={styles.home}>
            {user &&
                <>
                    <article>
                        <h2>{user.blogInfo.name}</h2>
                        <div className={styles.user}>
                            <img className={styles.avatar} src={user.avatar || defaultImage} alt="user avatar" />
                            <div className={styles.info}>
                                <h3>{user.name}</h3>
                                <p>{user.blogInfo.introduction}</p>
                            </div>
                        </div>
                    </article>
                    <article className={styles.latest}>
                        <div className={styles.latestHeader}>
                            <h2>Latest Posts</h2>
                            {user._id === isLoggedIn?._id && <button onClick={handleCreate}><i className="fas fa-edit"></i></button>}
                        </div>
                        {post ? (
                            <Post post={post} api={api} user={user} />
                        ) : (
                            <div className={styles.none}>게시글이 없습니다.</div>
                        )}
                    </article>
                </>
            }
        </section>
    )
}

export default Home;
