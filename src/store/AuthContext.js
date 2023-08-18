import { createContext, useState } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    logout: () => {},
    login: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    function logout() {
        localStorage.removeItem('setIsLoggedIn');
        setIsLoggedIn(false);
    }

    function login() {
        localStorage.setItem('setIsLoggedIn', '1');
        setIsLoggedIn(true);
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                login: login,
                logout: logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;