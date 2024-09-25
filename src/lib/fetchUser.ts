import { useEffect, useState } from "react";

import { JSON_SERVER_URL } from "~/lib/constants.ts";

export default async function useFetchUser(id: string | null = null) {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${JSON_SERVER_URL}/users?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("got response");

          const jsonResponse = await response.json();
          console.log(jsonResponse);
          if (jsonResponse.length > 0) {
            console.log("login successful");
            const { id, username, collections } = jsonResponse[0];
            // console.log(jsonResponse[0]);

            // setUser(userData);
            setUserData({ id, username, collections });
            // console.log(user);
          } else {
            setError("Username does not exist");
          }
        } else {
          setError(
            `Error logging in: ${response.status} ${response.statusText}`,
          );
        }
      } catch (error) {
        setError(`Error fetching user data: ${error}`);
      }
    };
    fetchUserData();
  });

  return { userData, error };
}
