import { QueryKey } from "@tanstack/react-query"

export async function fetchServerData(queryKey: QueryKey): Promise<unknown> {
  console.log({ queryKey })
  const queryUrl = `${queryKey[0]}${queryKey[1]}${queryKey[2]}`
  console.log(`fetching ${queryUrl}`)
  const response = await fetch(queryUrl)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  const JSONData = await response.json()
  console.log(JSONData)
  return JSONData
}
