import { QueryKey } from "@tanstack/react-query"

export async function fetchServerData(queryKey: QueryKey): Promise<unknown> {
  const queryUrl = `${queryKey[0]}${queryKey[1]}${queryKey[2]}`
  const response = await fetch(queryUrl)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const JSONData = await response.json()
  return JSONData
}
