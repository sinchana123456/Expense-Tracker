import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button';
import classes from './Profile.module.css';
import UserProfile from './UserProfile';

const Profile = () => {
    const authCntx = useContext(AuthContext);

    const verifyEmailHandler = () => {
        const res = axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBMnZAZWuByk0EHsJlfFgLCX822DsLNQXo',
        {idToken: authCntx.token, requestType:'VERIFY_EMAIL'}
            ).then((res) => {
                console.log(res);
        }).catch((err) => {
            console.log(err);
            alert(err);
        })
      };

    return (
        <section className={classes.profile}>
            <h1>Complete Your Profile</h1>
            <UserProfile />
            <h2>Verify your email adress</h2>
            {console.log(authCntx.email)}
            <p>
                You've entered {''}
                <span style={{ fontWeight: 'bold', fontStyle:'italic' }}>
                    {authCntx.email}
                </span>{''}
                    as the email adress for your account.
                <br />
                <br />
                Please Verify it by clicking button below.
            </p>
            <Button onClick={verifyEmailHandler}>Verify your email</Button>
        </section>

    )
};

export default Profile;