import styles from './app.module.css';
import { Switch, Route, useLocation, Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Home from './pages/Home/home';
import Join from './pages/Join/join';
import Login from './pages/Login/login';
import Sidebar from './components/Sidebar/sidebar';
import Header from './components/Header/header';
import ViewPosts from './pages/ViewPosts/viewPosts';
import PostDetail from './pages/PostDetail/postDetail';
import PostEditor from './pages/PostEditor/postEditor';
import SocialLogin from './pages/SocialLogin/socialLogin';
import PublicHome from './pages/PublicHome/publicHome';
import ErrorPage from './pages/ErrorPage/errorPage';
import Settings from './pages/Settings/settings';
import PrivacyPolicy from './pages/PrivacyPolicy/privacyPolicy';
import _ from 'lodash';
import Weather from './components/Weather/weather';

function App({ api }) {
  const path = useLocation().pathname;
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")) || undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(window.localStorage.getItem("isLoggedIn")) || undefined);
  const [toggle, setToggle] = useState(false);

  const fetchUserData = useCallback(async (option) => {
    if (option) { //1
      setUser(undefined);
      return;
    }
    const nickname = path.split("/")[1].substr(1);
    const userData = await api.fetchPublicUser(nickname);
    if (_.isEqual(user, userData)) {
      return;
    }
    setUser(userData); //없는 닉넴=>null
  }, [api, path, user]);

  const fetchLoginData = useCallback(async (option) => {
    if (option) { //1
      setIsLoggedIn(null);
      return;
    }
    const loginData = await api.fetchLoginUser(); //로그인X,에러=>null, 그외 {_id,name}
    setIsLoggedIn(loginData);
  }, [api])

  useEffect(() => {
    if (!path.match(/^\/@/)) {
      return;
    }
    fetchUserData();
  }, [fetchUserData, path]);

  useEffect(() => {
    fetchLoginData();
  }, [fetchLoginData]);


  useEffect(() => {
    if (user && (user.folders.length === 0)) {
      const fetchData = async () => {
        await api.makeFolder();
        fetchUserData();
      }
      fetchData();
    };
  }, [user, api, fetchUserData])

  useEffect(() => {
    user && window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    isLoggedIn && window.localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleToggle = useCallback(() => {
    setToggle(state => !state);
  }, [])
  return (
    <div className={styles.app}>
      <Header api={api} onFetchLoginData={fetchLoginData} onFetchUser={fetchUserData} onToggle={handleToggle} user={user} isLoggedIn={isLoggedIn} />
      {user && path.match(/^\/@/) &&
        <nav className={styles.nav}>
          <Sidebar api={api} onFetchUser={fetchUserData} isLoggedIn={isLoggedIn} user={user} toggle={toggle} onToggle={handleToggle} />
          <Weather api={api} />
        </nav>
      }
      <section className={`${styles.content} ${path.match(/^\/@/) && styles.middle}`}>
        <Switch>
          <Route path="/" exact>
            <PublicHome api={api} onFetchLoginData={fetchLoginData} onFetchUser={fetchUserData} />
          </Route>
          <Route path="/join" exact>
            <Join api={api} />
          </Route>
          <Route path="/login" exact>
            <Login api={api} onfetchLoginData={fetchLoginData} />
          </Route>
          <Route path="/posts" exact>
            <PublicHome api={api} />
          </Route>
          <Route path="/privacy_policy" exact>
            <PrivacyPolicy />
          </Route>
          <Route path="/:nickname" exact>
            { // /@닉네임=> 제대로 된거면 object, 잘못된 닉네임이면 null, 아직 유저 정보를 fetch해오지 않은 경우=> undefined
              user || user === undefined ? <Home user={user} api={api} isLoggedIn={isLoggedIn} /> : <ErrorPage statusCode="404" />
            }
          </Route>
          <Route path="/:nickname/user/settings" exact>
            {
              isLoggedIn?._id === user?._id ? <>
                <Settings api={api} user={user} onFetchLoginData={fetchLoginData} onFetchUser={fetchUserData} />
              </> : <ErrorPage statusCode="403" />
            }
          </Route>
          <Route path="/:nickname/posts/create" exact>
            {
              isLoggedIn?.name === user?.name ?
                <PostEditor api={api} user={user} />
                : <ErrorPage statusCode="403" />
            }
          </Route>
          <Route path="/:nickname/posts/edit/:id([0-9a-f]{24})" exact>
            {
              isLoggedIn?.name === user?.name ?
                <PostEditor api={api} user={user} />
                : <ErrorPage statusCode="403" />
            }

          </Route>
          <Route path="/:nickname/post/:id([0-9a-f]{24})" exact>
            <PostDetail api={api} user={user} isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/oauth/callback/:id" exact>
            <SocialLogin api={api} onfetchLoginData={fetchLoginData} onFetchUser={fetchUserData} />
          </Route>
          <Route path="/:nickname/:id" exact>
            {user ? <ViewPosts api={api} user={user} isLoggedIn={isLoggedIn} /> : <ErrorPage statusCode="404" />}
          </Route>
          <Route path="/">
            <ErrorPage statusCode="404" />
          </Route>
        </Switch>
        <footer>
          <p>Copyright ⓒ 2021. noma. All rights reserved.</p>
          <Link to="/privacy_policy"> 개인정보처리방침 </Link>
        </footer>
      </section>
    </div>
  );
}

export default App;
