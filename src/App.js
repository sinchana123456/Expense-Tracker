import { Fragment, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Authentication from './components/Authentication/Authentication';
import Header from './components/Layout/Header';
import Home from './components/pages/Home';
import ProfilePage from './components/pages/ProfilePage';
import AuthContext from './store/auth-context';

const App = () => {  
  const authCntx = useContext(AuthContext);

  return (
        <Fragment>
        <Header />
        <main>
          <Switch>
            <Route path='/auth'>
              {!authCntx.isLogin && <Authentication />}
            </Route>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route>
              {authCntx.isLogin && <ProfilePage />}
              {!authCntx.isLogin && <Redirect to='/auth' />}
            </Route>
          </Switch>
        </main>
    </Fragment>
  );
}

export default App;
