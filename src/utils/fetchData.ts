import wretch from "wretch";

import { JSON_SERVER_URL } from "./constants";

export async function fetchData(url: string) {
  if (!url) url = JSON_SERVER_URL;
  const response = await wretch(url).get().json();
  return response;
}
