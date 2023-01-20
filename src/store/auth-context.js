import React from "react";

const AuthContext = React.createContext({
    token: '',
    email: '',
    isLogin: false,
    login: (token) => {},
    logout: () => {}
});

export default AuthContext;