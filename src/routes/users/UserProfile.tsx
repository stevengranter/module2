/* eslint-disable react-refresh/only-export-components */
import type { Params } from 'react-router-dom';
import { useLoaderData, Link } from 'react-router-dom';

import wretch from 'wretch';

import type { userType } from 'models/userType';

export async function loader({ params }: { params: Params<'userId'> }) {
  const response = await wretch(
    'http://localhost:3000/users?id=' + params.userId
  )
    .get()
    .json<userType[]>();
  return response;
}

export function UserProfile() {
  const [user] = useLoaderData() as userType[];
  return (
    <>
      <h2>Welcome WilderNaut {user.firstName}!</h2>
      View my <Link to='./collection'>collection</Link>
    </>
  );
}
