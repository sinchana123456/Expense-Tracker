import { useContext, useState } from 'react';
import { NavLink, useHistory,  } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './Header.module.css';
import LogOut from './LogOut';

const Header = () => {
    const authCntx = useContext(AuthContext);
    const history = useHistory();
    const [isHover, setIsHover] = useState(false);

    const logOutHandler = () => {
        authCntx.logout();
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
                    {!authCntx.isLogin && (
                        <li>
                        <NavLink to='/auth' 
                            activeClassName={classes.active}>
                            Login
                        </NavLink>
                    </li>
                    )} 
                    {authCntx.isLogin && (
                        <li>
                        <NavLink to='/profile' 
                            activeClassName={classes.active}>
                            Profile
                        </NavLink>
                    </li>
                    )}  
                    {authCntx.isLogin && (
                        <li>
                        <NavLink to='/expense'
                            style={{
                                backgroundColor: isHover ? 'green': '',
                                color: isHover ? 'white' : ''
                            }} 
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                            activeClassName={classes.active}>
                            Add Expense
                        </NavLink>
                    </li>
                    )}                         
                </ul>
            </nav>
            {authCntx.isLogin && (
                <LogOut 
                    onClick={logOutHandler}>
                    Log Out
                </LogOut>
            )}
        </header>
    )
};

export default Header;