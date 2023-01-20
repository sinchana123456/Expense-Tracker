import { Fragment, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import classes from './Authentication.module.css';
import Login from "./Login";
import SignUp from "./SignUp";

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(false);
    const authCntx = useContext(AuthContext);

    const SignUpHandler = (email, password) => {
        fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMnZAZWuByk0EHsJlfFgLCX822DsLNQXo',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }),
                    headers:{
                        "Content-Type": "application/json",
                    }
                }
            )
            .then((res) => {
                if(res.ok){
                  return res.json()
                }else{
                  return res.json().then((data) => {
                    const errormsg = data.error.message;
                    throw new Error(errormsg)
                  })
                }
              })
              .then((data) => {
                console.log('successfully created account');
                console.log(data);
              })
              .catch((err) => {
                alert(err.message);
              })
        }

        const LoginHandler = (email, password) => {
            fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMnZAZWuByk0EHsJlfFgLCX822DsLNQXo',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }),
                    headers:{
                        "Content-Type": "application/json",
                    }
                }
            )
            .then((res) => {
                if(res.ok){
                  return res.json()
                }else{
                  return res.json().then((data) => {
                    const errormsg = data.error.message;
                    throw new Error(errormsg)
                  })
                }
              })
              .then((data) => {
                authCntx.login(data.idToken)
                console.log(data);
                console.log('successfully loggedIn');
              })
              .catch((err) => {
                alert(err.message);
              })     
        };

        const onClickSignUpHandler = () => {
            setIsLogin(true)
        };

        const onClickLoginHandler = () => {
            setIsLogin(false)
        };

    return (
        <Fragment>
            {!isLogin &&<SignUp onSignUp={SignUpHandler} />}
            {isLogin && <Login onLogin={LoginHandler} />}
            {!isLogin && (
                <button 
                    className={classes.signup} 
                    onClick={onClickSignUpHandler}>
                    Have an account? Login
                </button>
            )}
            {isLogin && (
                <button 
                    className={classes.signup} 
                    onClick={onClickLoginHandler}>
                    Don't have an account? Sign up
                </button>
            )}
        </Fragment>
    )
};

export default Authentication;