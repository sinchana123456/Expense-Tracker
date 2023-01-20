import { Fragment, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Authentication from './components/Authentication/Authentication';
import Login from './components/Authentication/Login';
import SignUp from './components/Authentication/SignUp';
import Header from './components/Layout/Header';
import UserProfile from './components/Layout/UserProfile';
import AuthContext from './store/auth-context';

const App = () => {  
  const authCntx = useContext(AuthContext);

  return (
        <Fragment>
        <main>
          <Switch>
          {authCntx.isLogin && 
          <Route path='/' exact>
            <Header />
            {!authCntx.isLogin && 
              <Redirect to='/login' />}
          </Route>}
          <Route path='/signUp'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          {!authCntx.isLogin && (
            <Route path = '/authentication'>
            <Authentication />
          </Route>
          )}
          {authCntx.isLogin && (
          <Route path = '/header'>
            <Header />
          {!authCntx.isLogin && 
            <Redirect to='/login' />}
          </Route>
          )}
          {authCntx.isLogin && (
          <Route path='/update-profile'>
            <UserProfile />
          {!authCntx.isLogin && <Redirect to='/login' />}
          </Route>
          )}
          </Switch>
        </main>
    </Fragment>
  );
}

export default App;
