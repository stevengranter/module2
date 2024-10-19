import { Table, Title } from "@mantine/core";
import { useFetch } from "@mantine/hooks";

import { JSON_SERVER_URL } from "lib/constants.ts";
import { UserType } from "models/UserType.ts";

export default function UserList() {
  const apiURL = JSON_SERVER_URL;
  const endPoint = "/users";
  const { loading, error, data } = useFetch<UserType[]>(`${apiURL}${endPoint}`);

  // noinspection BadExpressionStatementJS
  error && <h1>Error: ${error.message}</h1>;

  const rows =
    data &&
    data.map((user: UserType) => (
      <Table.Tr key={user.id}>
        <Table.Td>{user.id}</Table.Td>
        <Table.Td>{user.username}</Table.Td>
        <Table.Td>{user.firstName}</Table.Td>
        <Table.Td>{user.lastName}</Table.Td>
      </Table.Tr>
    ));

  return loading ? (
    "Loading..."
  ) : (
    <>
      <Title order={2}>Users</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
