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
import Posts from './pages/Posts/posts';

function App({ api }) {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const handleLogin = useCallback(() => {
    setLogin(true);
  });
  const handleLogout = useCallback(() => {
    setLogin(false);
  });

  useEffect(() => {
    const fetchData = async () => {
      const userData = await api.getUserData();
      setUser(userData);
    };
    fetchData();
  }, [login, api]);
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <Header api={api} onLogout={handleLogout} user={user} />
          <Sidebar />
          <footer>
            ⓒ noma
          </footer>
        </nav>
        <section className={styles.content}>
          <Switch>
            <Route path="/" exact>
              <Home user={user} />
            </Route>
            <Route path="/join" exact>
              <Join api={api} />
            </Route>
            <Route path="/login" exact>
              <Login api={api} onLogin={handleLogin} />
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
