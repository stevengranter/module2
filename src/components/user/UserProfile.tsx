import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { JSON_SERVER_URL } from "../../utils/constants.ts";

export default function UserProfile() {
  const { userId } = useParams();
  // console.log(userId);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(JSON_SERVER_URL + "/users?id=" + userId);
        return await response.json();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
      return null;
    }
    fetchUser().then((result) => setData(result[0]));
  }, [userId]);

  return isLoading ? (
    "Loading..."
  ) : (
    <>
      <h2>WilderNaut {data.firstName}</h2>
      {data.collection ? (
        <>View my collection</>
      ) : (
        <>User has not started collecting yet.</>
      )}

      {/*<Outlet />*/}
    </>
  );
}
