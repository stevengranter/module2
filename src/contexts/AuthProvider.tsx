import { ReactNode } from "react";

import useUser from "../hooks/useUser.ts";
import AuthContext from "./AuthContext.ts";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, login, logout } = useUser();

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// export default AuthContext;
