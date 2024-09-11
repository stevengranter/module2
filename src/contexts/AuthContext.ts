import { createContext } from "react";

import { UserType } from "../models/UserType.ts";

type AuthType = {
  user: UserType | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
