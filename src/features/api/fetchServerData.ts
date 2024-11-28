import { QueryKey } from "@tanstack/react-query"

export async function fetchServerData(queryKey: QueryKey): Promise<unknown> {
  const queryUrl = `${queryKey[0]}${queryKey[1]}${queryKey[2]}`
  console.log({ queryUrl })
  const response = await fetch(queryUrl)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return await response.json()
}
