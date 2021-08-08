import styles from './app.module.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Home from './pages/home/home';
import Join from './pages/Join/join';
import Login from './pages/Login/login';
import Sidebar from './components/Sidebar/sidebar';
import Header from './components/Header/header';
import ViewPosts from './pages/ViewPosts/viewPosts';
import PostDetail from './pages/PostDetail/postDetail';
import CreateAndEditPost from './pages/CreateAndEditPost/createAndEditPost';
import SocialLogin from './pages/SocialLogin/socialLogin';
import EditUser from './pages/EditUser/editUser';
import EditBlog from './pages/EditBlog/editBlog';
import { Desktop } from './common/mediaQuery';
import PublicHome from './pages/PublicHome/publicHome';
import ErrorPage from './pages/ErrorPage/errorPage';

function App({ api }) {
  const path = useLocation().pathname;
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")) || null);
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(window.localStorage.getItem("isLoggedIn")) || undefined);
  const [toggle, setToggle] = useState(false);

  const fetchUserData = useCallback(async () => {
    const nickname = path.split("/")[1].substr(1);
    const userData = await api.getPublicUserData(nickname);
    setUser(userData); //없는 닉넴=>null
    console.log("퍼블릭 유저 Refresh!");
  }, [api, path]);

  const fetchLoginData = useCallback(async () => {
    const loginData = await api.getLoginData(); //로그인X,에러=>null, 그외 {_id,name}
    setIsLoggedIn(loginData);
    console.log("로그인 유저 Refresh!")
  }, [api])

  useEffect(() => {
    if (['/login', '/join', '/'].includes(path)) {
      return;
    }
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    fetchLoginData();
  }, [fetchLoginData]);


  useEffect(() => {
    if (user && (user.folders.length === 0)) {
      api.makeFolder();
      fetchUserData();
    };
  }, [user, fetchUserData])

  useEffect(() => {
    user && window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    isLoggedIn && window.localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleToggle = () => {
    setToggle(!toggle);
  }
  return (
    <div className={styles.app}>
        <nav className={styles.nav}>
        <Header api={api} onFetchLoginData={fetchLoginData} onToggle={handleToggle} user={user} isLoggedIn={isLoggedIn} />
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
            <PublicHome />
          </Route>
          <Route path="/join" exact>
            <Join api={api} />
          </Route>
          <Route path="/login" exact>
            <Login api={api} onFetchUser={fetchUserData} />
          </Route>
          <Route path="/:nickname" exact>
            {
              user ? <Home user={user} api={api} /> : <ErrorPage statusCode="404" />
            }
          </Route>
          <Route path="/:nickname/user/edit" exact>
            {
              isLoggedIn?.name === user?.name ? <>
            <EditBlog api={api} onFetchUser={fetchUserData} user={user} />
            <EditUser api={api} onFetchUser={fetchUserData} user={user} />
              </> : <ErrorPage statusCode="403" />
            }
          </Route>
          <Route path="/:nickname/posts/create" exact>
            {
              isLoggedIn?.name === user?.name ?
            <CreateAndEditPost api={api} user={user} />
                : <ErrorPage statusCode="403" />
            }
          </Route>
          <Route path="/:nickname/posts/edit/:id([0-9a-f]{24})" exact>
            {
              isLoggedIn?.name === user?.name ?
            <CreateAndEditPost api={api} user={user} />
                : <ErrorPage statusCode="403" />
            }

          </Route>
          <Route path="/:nickname/post/:id([0-9a-f]{24})" exact>
            <PostDetail api={api} user={user} />
          </Route>
          <Route path="/oauth/callback/:id" exact>
            <SocialLogin api={api} onFetchUser={fetchUserData} />
          </Route>
          <Route path="/:nickname/:id" exact>
            <ViewPosts api={api} user={user} />
          </Route>
          <Route path="/">
            <ErrorPage statusCode="404" />
          </Route>
        </Switch>
      </section>
    </div>
  );
}

export default App;
