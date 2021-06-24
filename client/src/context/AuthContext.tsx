import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  //   const [loading, setLoading] = useState(true);
  //   const [currentUser, setCurrentUser] = useState();

  const signup = (email: string, username: string, password: string) => {
    return axios.post("http://localhost:3001/api/v1/user/signup", {
      username,
      email,
      password,
    });
  };

  const login = (email: string, password: string) => {
    return axios.post("http://localhost:3001/api/v1/user/login", {
      email,
      password,
    });
  };

  //   const logout = () => {};

  //   useEffect(() => {}, []);

  const value = {
    login,
    // logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  );
};
