import { Fragment, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Authentication from './components/Authentication/Authentication';
import DummyPage from './components/DummyPage';
import AuthContext from './store/auth-context';

const App = () => {
  const authCntx = useContext(AuthContext);

  return (
    <Fragment>
    <Switch>
      {!authCntx.isLogin && (
        // <Route path = '/authentication'>
          <Authentication />
      // </Route>
      )}
      {authCntx.isLogin && (
        // <Route path = '/dummypage'>
          <DummyPage />
        // </Route>
      )}
    </Switch>
    </Fragment>
  );
}

export default App;
