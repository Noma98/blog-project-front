import './app.module.css';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/home/home';
import Join from './components/Join/join';
import Login from './components/Login/login';

function App({ api }) {
  return (
    <div className="app">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
