import React from "react";

const AppContext = React.createContext({
  isLoggedIn: false,
  isLoading: true,
  setIsLoggedIn: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  token: null,
  setToken: () => {}
});

export default AppContext;
