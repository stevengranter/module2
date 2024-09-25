import { useEffect, useState } from "react";

import { JSON_SERVER_URL } from "~/lib/constants.ts";

export function useUser() {
  const [user, setUser] = useState<{
    id: string;
    username: string;
    collections: [];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);

  useEffect(() => {
    console.log("Logged in user:");
    console.log({ user });
  }, [user]);

  async function login(
    formData: { username: string; password: string } | null = null,
  ) {
    console.log("login(formData)");
    console.log(formData);
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
          const { id, username, collections } = jsonResponse[0];
          console.log(jsonResponse[0]);
          const userData = { id, username, collections };
          setUser(userData);
          setIsAuthenticated(true);
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

  function startGuestSession() {
    console.log("in Guest session");

    let localUserJSON = localStorage.getItem("guest");
    if (!localUserJSON)
      localUserJSON = JSON.stringify({
        id: "guest",
        name: "guestUser",
        collections: [],
      });
    localStorage.setItem("guest", localUserJSON);
    const localUser = JSON.parse(localUserJSON);
    setUser(localUser);
    console.log(localUser);
  }

  function endGuestSession() {
    console.log(user);
    // localStorage.setItem("user", JSON.stringify(guest));
    setUser(null);
  }

  return {
    user,
    error,
    login,
    logout,
    isAuthenticated,
    startGuestSession,
    endGuestSession,
  };
}
