import { createContext, PropsWithChildren, useContext, useState } from "react";

import { JSON_SERVER_URL } from "~/features/_shared/lib/constants.ts";

type AuthContext = {
  id: string | null;
  isAuthenticated?: boolean | null;
  login?: (formData: { username: string; password: string }) => Promise<void>;
  logout?: () => void;
  error?: string | undefined | null;
};

const AuthContext = createContext<AuthContext | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  const { id, isAuthenticated, login, logout, error } = context;
  return { id, isAuthenticated, login, logout, error };
}

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [id, setId] = useState(null);

  async function login(
    formData: { username: string; password: string } | null = null,
  ) {
    console.log("login(formData)");
    console.log(formData);
    if (!formData) {
      setError("No form data submitted");
      return;
    }
    try {
      const response = await fetch(
        `${JSON_SERVER_URL}/users?username=${formData.username}&password=${formData.password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        console.log("got response");

        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.length > 0) {
          console.log("login successful");
          // const { id, username, collections } = jsonResponse[0];
          // console.log(jsonResponse[0]);
          // const userData = { id, username, collections };
          // setUser(userData);
          setId(jsonResponse[0].id);
          setIsAuthenticated(true);
          // console.log(user);
        } else {
          setError("Username does not exist");
        }
      } else {
        setError(`Error logging in: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error fetching user data: ${error}`);
    }
  }

  function logout() {
    // setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ id, isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}
