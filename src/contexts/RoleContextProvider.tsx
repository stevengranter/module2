import { createContext, PropsWithChildren } from "react";

import { Role } from "~/contexts/Roles.ts";
import { useUser } from "~/hooks/useUser.ts";

type RoleContext = {
  role: Role.Anon | Role.Guest | Role.User | Role.Admin;
  isAuthenticated?: boolean | null;
  user?: { id: string; username: string; collections: [] } | null;
  login?: (formData: { username: string; password: string }) => Promise<void>;
  logout?: () => void;
};

export const RoleContext = createContext<RoleContext>({ role: Role.Anon });

export default function RoleContextProvider({ children }: PropsWithChildren) {
  const role = Role.Anon;
  const { user, isAuthenticated, login, logout } = useUser();
  return (
    <RoleContext.Provider
      value={{ role, isAuthenticated, user, login, logout }}
    >
      {children}
    </RoleContext.Provider>
  );
}
