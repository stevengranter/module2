import { useEffect, useState } from "react";

import { JSON_SERVER_URL } from "~/lib/constants.ts";

export function useUser() {
  const [user, setUser] = useState<{ username: string; collection: [] } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Logged in user:");
    console.log({ user });
  }, [user]);

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
          const { username, collection } = jsonResponse[0];
          console.log(jsonResponse[0]);
          const userData = { username, collection };
          setUser(userData);
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
