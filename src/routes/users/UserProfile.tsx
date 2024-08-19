import wretch from 'wretch';
import { userType } from 'models/userType';
import { useLoaderData } from 'react-router-dom';
import type { Params } from 'react-router-dom';

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
    </>
  );
}
