import { Link } from "react-router-dom";

import { Title } from "@mantine/core";
import { useFetch } from "hooks/useFetch.ts";

import { UserType } from "models/UserType.ts";
import { JSON_SERVER_URL } from "utils/constants.ts";

export default function UserList() {
  const apiURL = JSON_SERVER_URL;
  const endPoint = "/users";
  const { isLoading, error, data } = useFetch<UserType[]>(
    `${apiURL}${endPoint}`,
  );

  // noinspection BadExpressionStatementJS
  error && <h1>Error: ${error.message}</h1>;

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <Title order={2}>Users</Title>
      <ul>
        {data?.map((user: UserType) => {
          return (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.firstName}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}