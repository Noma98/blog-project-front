import styles from './app.module.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Home from './pages/home/home';
import Join from './pages/Join/join';
import Login from './pages/Login/login';
import Sidebar from './components/Sidebar/sidebar';
import Header from './components/Header/header';
import ViewPosts from './pages/ViewPosts/viewPosts';
import CreatePost from './pages/CreatePost/createPost';
import PostDetail from './pages/PostDetail/postDetail';
import EditPost from './pages/EditPost/editPost';
import SocialLogin from './pages/SocialLogin/socialLogin';
import EditUser from './pages/EditUser/editUser';
import EditBlog from './pages/EditBlog/editBlog';
import NotFound from './pages/NotFound/notFound';
import { Desktop } from './common/mediaQuery';

function App({ api }) {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const [toggle, setToggle] = useState(false);

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
  }, [login, fetchUserData]);

  useEffect(() => {
    if (user && user.folders.length === 0) {
      api.makeFolder();
      fetchUserData();
    };
  }, [user, fetchUserData])

  const handleToggle = () => {
    setToggle(!toggle);
  }
  return (
    <BrowserRouter>
      <div className={styles.app}>
        {user &&
          <nav className={styles.nav}>
            <Header api={api} onLogout={handleLogout} user={user} onToggle={handleToggle} />
            <Sidebar api={api} onFetchUser={fetchUserData} user={user} toggle={toggle} onToggle={handleToggle} />
            <Desktop>
              <footer>
                ⓒ noma
              </footer>
            </Desktop>
          </nav>
        }
        <section className={`${styles.content} ${!user && styles.guest}`}>
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
            <Route path="/user/edit" exact>
              <EditBlog api={api} onFetchUser={fetchUserData} user={user} />
              <EditUser api={api} onFetchUser={fetchUserData} user={user} />
            </Route>
            <Route path="/posts/create" exact>
              <CreatePost api={api} user={user} />
            </Route>
            <Route path="/posts/edit/:id([0-9a-f]{24})" exact>
              <EditPost api={api} user={user} />
            </Route>
            <Route path="/post/:id([0-9a-f]{24})" exact>
              <PostDetail api={api} user={user} />
            </Route>
            <Route path="/oauth/callback/:id" exact>
              <SocialLogin api={api} onLogin={handleLogin} />
            </Route>
            <Route path="/:id" exact>
              <ViewPosts api={api} user={user} />
            </Route>
            <Route path="/">
              <NotFound />
            </Route>
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
