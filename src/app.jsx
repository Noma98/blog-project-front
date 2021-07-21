import styles from './app.module.css';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/home/home';
import Join from './components/Join/join';
import Login from './components/Login/login';
import Sidebar from './components/Sidebar/sidebar';
import Header from './components/Header/header';

function App({ api }) {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <Header api={api} />
          <Sidebar />
          <footer>
            ⓒ noma
          </footer>
        </nav>
        <section className={styles.content}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/join" exact>
              <Join api={api} />
            </Route>
            <Route path="/login" exact>
              <Login api={api} />
            </Route>
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
