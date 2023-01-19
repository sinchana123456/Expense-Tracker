import { Fragment, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Authentication from './components/Authentication/Authentication';
import Header from './components/Layout/Header';
import UserProfile from './components/Layout/UserProfile';
import AuthContext from './store/auth-context';

const App = () => {
  const authCntx = useContext(AuthContext);

  return (
    <Fragment>
      <Header />
        <main>
          <Switch>
            {!authCntx.isLogin && (
              <Route path = '/authentication'>
              <Authentication />
            </Route>
            )}
            {authCntx.isLogin && (
            <Route path = '/' exact>
              <Header />
            </Route>
            )}
            {authCntx.isLogin && (
            <Route path='/update-profile'>
              <UserProfile />
            </Route>
            )}
          </Switch>
        </main>
    </Fragment>
  );
}

export default App;
