import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  role: '',
  onLogout: () => {},
  onLogin: (userName, password, role) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState({ isLoggedIn: false, role: "" });

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    const storedUserRoleInformation = localStorage.getItem("userRole");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn({ isLoggedIn: true, role: storedUserRoleInformation });
    }
  }, []);

  const logoutHandler = async () => {
    setIsLoggedIn(false);
    localStorage.clear('isLoggedIn');
    window.location.href = '/';
  };

  const loginHandler = (userName, password, role) => {
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("userName", userName);
    localStorage.setItem("userRole", role);
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn.isLoggedIn,
        role: isLoggedIn.role,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
