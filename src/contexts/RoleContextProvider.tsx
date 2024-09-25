import { createContext, PropsWithChildren } from "react";

export const permissionMap = {
  user: ["edit-collection", "read-dashboard"],
  guest: ["edit-collection", "read-dashboard"],
  public: ["read-collection"],
};

type RoleContext = {
  role: "admin" | "user" | "guest" | "public";
  isAuthenticated: boolean;
};

export const RoleContext = createContext<RoleContext>({
  role: "public",
  isAuthenticated: false,
});

export default function RoleContextProvider({ children }: PropsWithChildren) {
  const role = "public";
  const isAuthenticated = false;
  return (
    <RoleContext.Provider value={{ role, isAuthenticated }}>
      {children}
    </RoleContext.Provider>
  );
}
