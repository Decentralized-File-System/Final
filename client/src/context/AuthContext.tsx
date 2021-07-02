import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../Utils/Variables";

const AuthContext = createContext<any>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const signup = (email: string, username: string, password: string) => {
    return axios.post(
      `${BASE_URL}/user/signup`,
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
      `${BASE_URL}/user/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  };

  const logout = () => {
    return axios.get(`${BASE_URL}/user/logout`, { withCredentials: true });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/token`, { withCredentials: true })
      .then((data) => {
        setCurrentUser(data.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    signup,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
