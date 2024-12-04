import { QueryKey } from "@tanstack/react-query"

type NodeProcess = {
  env: {
    NODE_ENV?: "development" | "production"
    NINJA_API_KEY?: string
  }
}

const process = { env: {} } as NodeProcess
const myApiKey = process.env.NODE_ENV
  ? process.env.NINJA_API_KEY
  : import.meta.env.VITE_NINJA_API_KEY

// const myApiKey = import.meta.env.VITE_NINJA_API_KEY

export async function fetchServerData(queryKey: QueryKey): Promise<unknown> {
  // const queryUrl = `${queryKey[0]}${queryKey[1]}${queryKey[2]}`
  const queryUrl = queryKey.join("")
  console.log({ queryUrl })
  const response = await fetch(queryUrl)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return await response.json()
}

export async function fetchNinjaAPIData(queryKey: QueryKey) {
  const queryUrl = `${queryKey[0]}${queryKey[1]}${queryKey[2]}`
  if (!myApiKey) {
    console.log("No api key provided")
    return
  }
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Api-Key": myApiKey,
    },
  }
  console.log({ queryUrl })
  const response = await fetch(queryUrl, options)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return await response.json()
}
