import { useState } from "react";

import { JSON_SERVER_URL } from "~/lib/constants.ts";

export function useUser() {
  const [user, setUser] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function login(formData: { username: string; password: string }) {
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
        const jsonResponse = await response.json();
        if (jsonResponse.length > 0) {
          console.log("login successful");
          setUser(formData.username);
          console.log(user);
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
    setUser(null);
    console.log("logout here");
  }
  return { user, error, login, logout };
}
