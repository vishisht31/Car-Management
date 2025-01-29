import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let t = getToken();
    setToken(t);
  }, []);

  const getToken = () => {
    return localStorage.getItem("token_car_management");
  };

  // const getRole = (token) => {
  //   let decodedToken;
  //   try {
  //     decodedToken = jwtDecode(token);
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  //   return decodedToken?.isDoctor;
  // };

  const getUserId = () => {
    try {
      let decodedToken = jwtDecode(token);
      return decodedToken?.userId;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const isAuthorized = () => {
    return !!token;
  };

  const login = (access_token) => {
    localStorage.setItem("token_car_management", access_token);
    setToken(access_token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token_car_management");
  };

  return (
    <AuthContext.Provider
      value={{ token, login, isAuthorized, logout, getUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
