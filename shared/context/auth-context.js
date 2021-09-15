import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  firstName: null,
  lastName: null,
  login: () => {},
  logout: () => {},
});
