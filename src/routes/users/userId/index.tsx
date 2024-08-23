/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, Outlet, Link } from 'react-router-dom';

import type { userType } from 'models/userType';

export function UserProfile() {
  const [user] = useLoaderData() as userType[];
  return (
    <>
      <h2>WilderNaut {user.firstName}</h2>
      {user.collection ? (
        <>
          View my <Link to='collection'>collection</Link>
        </>
      ) : (
        <>User has not started collecting yet.</>
      )}

      <Outlet />
    </>
  );
}
