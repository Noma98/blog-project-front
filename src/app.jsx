import styles from './app.module.css';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/home/home';
import Join from './pages/Join/join';
import Login from './pages/Login/login';
import Sidebar from './components/Sidebar/sidebar';
import Header from './components/Header/header';
import { useCallback, useEffect, useState } from 'react';
import ViewPosts from './pages/ViewPosts/viewPosts';
import CreatePost from './pages/CreatePost/createPost';
import PostDetail from './pages/PostDetail/postDetail';
import EditPost from './pages/EditPost/editPost';
import SocialLogin from './pages/SocialLogin/socialLogin';

function App({ api }) {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const handleLogin = useCallback(() => {
    setLogin(true);
  }, []);
  const handleLogout = useCallback(() => {
    setLogin(false);
  }, []);
  const fetchUserData = useCallback(async () => {
    const userData = await api.getUserData();
    setUser(userData);
    console.log("Refresh!");
  }, [api]);

  useEffect(() => {
    fetchUserData();
    if (user && user.folders.length === 0) {
      api.makeFolder();
    };
  }, [login, fetchUserData, api]);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <Header api={api} onLogout={handleLogout} user={user} />
          <Sidebar api={api} onFetchUser={fetchUserData} user={user} />
          <footer>
            ⓒ noma
          </footer>
        </nav>
        <section className={styles.content}>
          <Switch>
            <Route path="/" exact>
              <Home user={user} api={api} />
            </Route>
            <Route path="/join" exact>
              <Join api={api} />
            </Route>
            <Route path="/login" exact>
              <Login api={api} onLogin={handleLogin} />
            </Route>

            <Route path="/posts/create" exact>
              <CreatePost api={api} user={user} />
            </Route>
            <Route path="/posts/edit/:id" exact>
              <EditPost api={api} user={user} />
            </Route>
            <Route path="/post/:id" exact>
              <PostDetail api={api} user={user} />
            </Route>
            <Route path="/oauth/callback/:id" exact>
              <SocialLogin api={api} onLogin={handleLogin} />
            </Route>
            <Route path="/:id" exact>
              <ViewPosts api={api} user={user} />
            </Route>
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
