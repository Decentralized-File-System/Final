import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const signup = (email: string, username: string, password: string) => {
    return axios.post(
      "http://localhost:3001/api/v1/user/signup",
      {
        username,
        email,
        password,
      },
      { withCredentials: true }
    );
  };

  const login = (email: string, password: string) => {
    return axios.post(
      "http://localhost:3001/api/v1/user/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  };

  //   const logout = () => {};

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/user/token", { withCredentials: true })
      .then((data) => {
        setCurrentUser(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const value = {
    currentUser,
    login,
    // logout,
    signup,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
