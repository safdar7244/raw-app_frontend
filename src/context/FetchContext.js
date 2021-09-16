import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const apiURL= "https://secret-ravine-90423.herokuapp.com/";
const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: "https://secret-ravine-90423.herokuapp.com"
   // baseURL: "http://localhost:3001"
  });

  authAxios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${authContext.authState.token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const code =
        error && error.response ? error.response.status : 0;
      if (code === 401 || code === 403) {
        console.log('error code', code);
      }
      return Promise.reject(error);
    }
  );

  return (
    <Provider
      value={{
        authAxios
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
