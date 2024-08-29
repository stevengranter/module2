import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Title } from "@mantine/core";

import { JSON_SERVER_URL } from "../../utils/constants.ts";

export default function UserList() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  async function fetchUsers() {
    try {
      const response = await fetch(`${JSON_SERVER_URL}/users`);
      return await response.json();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    return null;
  }

  useEffect(() => {
    fetchUsers().then((result) => setData(result));
  }, []);

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <Title order={2}>Users</Title>
      {data?.map((user) => {
        return (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              {" "}
              {/* Ensure the correct path is used */}
              {user.firstName}
            </Link>
          </li>
        );
      })}
    </>
  );
}
