import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import wretch from 'wretch';
import { userType } from 'models/userType';

export const Route = createFileRoute('/users/$id/')({
  component: UserComponent,
  loader: async ({ params: { id } }) => {
    const response = await wretch('http://localhost:3000/users?id=' + id)
      .get()
      .json<userType[]>();
    return response;
  },
});

function UserComponent() {
  const data = useLoaderData({ from: '/users/$id/' });
  const [user] = data;
  return (
    <>
      <h2>Welcome WilderNaut {user.firstName}!</h2>
    </>
  );
}
