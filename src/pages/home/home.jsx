import { useHistory } from 'react-router-dom';
import Post from '../../components/Post/post';
import withAuth from '../../hoc/withAuth'
import styles from './home.module.css';

function Home({ user }) {
    const history = useHistory();
    const handleCreate = () => {
        history.push("/posts/create");
    };
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
                        <Post />
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
