import { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authentication from './components/Authentication/Authentication';
import Header from './components/Layout/Header';
import ExpensePage from './components/pages/ExpensePage';
import Home from './components/pages/Home';
import ProfilePage from './components/pages/ProfilePage';

const App = () => {  
  const isLogin = useSelector(state => state.authentication.isLogin);

  return (
        <Fragment>
        <Header />
        <main>
          <Switch>
          {isLogin &&
          <Route path='/' exact>
              <Home />
            </Route>}
            <Route path='/auth'>
              {!isLogin && <Authentication />}
            </Route>
            <Route path='/profile'>
              {isLogin && <ProfilePage />}
              {!isLogin && <Redirect to='/auth' />}
            </Route>
            <Route path='/expense'>
              {isLogin && <ExpensePage />}
              {!isLogin && <Redirect to='/auth' />}
            </Route>
          </Switch>
        </main>
    </Fragment>
  );
}

export default App;
