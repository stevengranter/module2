import { useLoaderData, Link } from 'react-router-dom';

import { Title } from '@mantine/core';

import { UserType } from 'models/UserType';

export default function UsersIndexRoute() {
  const data = useLoaderData() as UserType[];
  console.log(data);
  return (
    <>
      <Title order={2}>Users</Title>
      {data.map((user) => {
        return (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              {' '}
              {/* Ensure the correct path is used */}
              {user.firstName}
            </Link>
          </li>
        );
      })}
    </>
  );
}
