import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.header}>
            <h1>Welcome to Expense Tracker!!!</h1>
            <div className={classes.profile}>
                Your profile is incomplete.
                <Link to='/update-profile'>
                    <span>Complete now</span>
                </Link>
            </div>
        </header>
    )
};

export default Header;