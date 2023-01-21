import axios from 'axios';
import { useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button';
import classes from './Profile.module.css';
import UserProfile from './UserProfile';

const Profile = () => {
    const [error, setError] = useState('');
    const authCntx = useContext(AuthContext);

    const verifyEmailHandler = () => {
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBMnZAZWuByk0EHsJlfFgLCX822DsLNQXo',
            {idToken: authCntx.token, requestType:'VERIFY_EMAIL'}
                ).then((res) => {
                    console.log(res);
            }).catch((err) => {
                console.log(err);
                setError(err);
            })
      };

    return (
        <section className={classes.profile}>
            <h1>Complete Your Profile</h1>
                <UserProfile />
            <h2>Verify your email adress</h2>
            <p>
                Please verify your entered email adress.
            </p>
            <Button onClick={verifyEmailHandler}>Verify your email</Button>
            {error === 'INVALID_ID_TOKEN' && (
                <p>
                    The user's credential is no longer valid. The user must sign in again.
                </p>
            )}
            {error === "USER_NOT_FOUND" && (
                <p>
                    There is no user record corresponding to this identifier. The user may
                    have been deleted.
                </p>
            )}
        </section>
    )
};

export default Profile;