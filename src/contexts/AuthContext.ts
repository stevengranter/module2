import { createContext } from "react";

type AuthType = {
  user: string | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
