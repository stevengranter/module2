import { INAT_API_URL } from "~/features/api/constants.ts";

export async function queryINatAPI({ queryKey }: { queryKey: string }) {
  console.log(`queryINatAPI()`);
  const queryUrl = `${INAT_API_URL}${queryKey[0]}`;
  console.log(`fetching ${queryUrl}`);
  const response = await fetch(`${INAT_API_URL}${queryKey[0]}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
