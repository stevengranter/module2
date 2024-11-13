import { useEffect, useState } from "react";

import { Table, Title } from "@mantine/core";
import { createColumnHelper, useReactTable } from "@tanstack/react-table";
import { JSON_SERVER_URL } from "~/features/api/constants.ts";
import { UserType } from "~/models/UserType.ts";
import { create } from "axios";

export default function UserManagement() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${JSON_SERVER_URL}/users`);
        return await response.json();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData().then((res) => setUserData(res));
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    userData && (
      <>
        <Title order={2}>User Management</Title>
        <UserTable userData={userData} />
      </>
    )
  );
}

function UserTable({ userData }) {
  // refactor: Migrate to mantine-datatable
  return (
    <Table.ScrollContainer minWidth={500}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Username</Table.Th>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>Activity Rate</Table.Th>
            <Table.Th>Nest Total</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {userData &&
            userData.length > 0 &&
            userData.map((user: UserType) => (
              <Table.Tr key={user.id}>
                {user.username && <Table.Td>{user.username}</Table.Td>}
                <Table.Td>{user.firstName}</Table.Td>
                <Table.Td>{user.lastName}</Table.Td>
                <Table.Td>{user.activityRate}</Table.Td>
                <Table.Td>{user.nest.items && user.nest.items.length}</Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
