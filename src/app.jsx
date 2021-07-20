import './app.module.css';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/home/home';
import Join from './components/Join/join';

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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
