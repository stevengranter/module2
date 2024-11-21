import { useParams } from "react-router-dom";

import { useFetch } from "@mantine/hooks";
import { JSON_SERVER_URL } from "~/features/api/constants.ts";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import { UserType } from "~/models/UserType.ts";

const apiURL = JSON_SERVER_URL;
const endPoint = "/users/";

export default function UserProfile(props: { userId?: string }) {
  let userId;
  const params = useParams();
  params.userId ? (userId = params.userId) : (userId = props.userId);

  const { loading, error, data } = useFetch<UserType>(
    `${apiURL}${endPoint}${userId}`,
  );

  if (loading) return "Loading...";
  if (error) return `Error: ${error}`;

  return (
    <>
      <h2>WilderNaut {data && data.firstName}</h2>
      {data?.collection ? (
        <>
          View my collection
          <CardCollection itemIdArray={data.collection} />
        </>
      ) : (
        <>User has not started collecting yet.</>
      )}
    </>
  );
}
