import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory,  } from 'react-router-dom';
import { authAction } from '../../store/auth-reducer';
import classes from './Header.module.css';
import LogOut from './LogOut';

const Header = () => {
    const isLogin = useSelector((state) => state.authentication.isLogin)
    const dispatch = useDispatch()
    const history = useHistory();
    const [isHover, setIsHover] = useState(false);

    const logOutHandler = () => {
        dispatch(authAction.logout());
        history.replace('/auth')
    };
    
    const mouseEnter = () => {
        setIsHover(true)
    };

    const mouseLeave = () => {
        setIsHover(false)
    };

    return (
        <header className={classes.header}>
            <h1>Welcome to Expense Tracker!!!</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/' 
                            activeClassName={classes.active} 
                            exact >
                            Home
                        </NavLink>
                    </li>
                    {!isLogin && (
                        <li>
                        <NavLink to='/auth' 
                            activeClassName={classes.active}>
                            Login
                        </NavLink>
                    </li>
                    )} 
                    {isLogin && (
                        <li>
                        <NavLink to='/profile' 
                            activeClassName={classes.active}>
                            Profile
                        </NavLink>
                    </li>
                    )}  
                    {isLogin && (
                    <li>
                        <NavLink to='/expense'
                            style={{
                                backgroundColor: isHover ? 'green': '',
                                color: isHover ? 'white' : ''
                            }} 
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                            activeClassName={classes.active}>
                            Expenses
                        </NavLink>
                    </li>
                    )}                         
                </ul>
            </nav>
            {isLogin && (
                <LogOut 
                    onClick={logOutHandler}>
                    Log Out
                </LogOut>
            )}
        </header>
    )
};

export default Header;