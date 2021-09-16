import React, {useState, createContext } from "react";

const AuthContext = createContext();
const {Provider} = AuthContext;

const AuthProvider = ({ children})=>{
    
  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  const expiresAt = localStorage.getItem('expiresAt');
  
    const [authState, setAuthState] = React.useState({
                token,
                expiresAt,
             });
    
    const setAuthInfo = ({token, expiresAt})=>{
        
        localStorage.setItem('token', token);
        
        localStorage.setItem('expiresAt', expiresAt);
    

        setAuthState({
            token,
            expiresAt,
            
        });

    };

    const isAuthenticated=()=>{

        if(!authState.token || !authState.expiresAt){
            return false;
        }
        
        return new Date().getTime() / 1000 < authState.expiresAt;

    }

    

    const logOut = () => {
        localStorage.removeItem('token');
    
        localStorage.removeItem('expiresAt');
        setAuthState({
            token: null,
            expiresAt:null,

        });

    }

    return (
        <Provider 
            value = {{
            authState,
            setAuthState: authInfo => setAuthInfo(authInfo),   
            logOut,
            isAuthenticated,
            
            } } 
        > 
        { children }
        </Provider>
    );
};

export {AuthContext , AuthProvider};