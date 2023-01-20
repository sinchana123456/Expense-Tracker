import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import classes from './Authentication.module.css';
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import SignUp from "./SignUp";

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
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

        const forgotPasswordHandler = (email) => {
          fetch(
              'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBMnZAZWuByk0EHsJlfFgLCX822DsLNQXo',
              {
                  method: 'POST',
                  body: JSON.stringify({
                      email: email,
                      requestType: 'PASSWORD_RESET'
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
              console.log(data);
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
        const onClickPasswordHandler = () => {
          setIsForgot(true)
        }

    return (
        <section className={classes.auth}>
            {!isLogin &&<SignUp onSignUp={SignUpHandler} />}
            {isLogin && <Login onLogin={LoginHandler} />}
            {!isLogin && (
                <Button 
                    onClick={onClickSignUpHandler}>
                    Have an account? Login
                </Button>
            )}
            {isForgot && <ForgotPassword  onForgot={forgotPasswordHandler}/> }
            {isLogin && (
              <button style={{
                cursor:'pointer',
                color: 'red', 
                backgroundColor:"white",
                border: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                }}
                className={classes.button}
                onClick={onClickPasswordHandler}>
                Forgot password ?  
              </button>
            )}
            <br />
            <br />
            {isLogin && (
                <Button 
                    onClick={onClickLoginHandler}>
                    Don't have an account? Sign up
                </Button>
            )}
        </section>
    )
};

export default Authentication;