import { useState } from "react";
import AuthContext from "./auth-context";


const AuthProvider = (props) => {
    const initialToken = localStorage.getItem('idToken');
    const initialEmail = localStorage.getItem("email");
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState(initialEmail);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        setEmail(email);
        localStorage.setItem('idToken', token);
        localStorage.setItem('email', email);
    };
    
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('idToken');
        localStorage.removeItem('email');
    };

    const contextValue = {
        token: token,
        email: email,
        isLogin: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;