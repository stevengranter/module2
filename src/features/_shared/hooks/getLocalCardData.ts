import { useEffect, useState } from "react"

import { JSON_SERVER_URL } from "~/features/api/constants.ts"
import { WilderKindCardType } from "~/models/WilderKindCardType.ts"

export function useServerData(
  enabled: boolean,
  url: string,
  formatterFn: () => void = undefined,
) {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!enabled) return

    const fetchData = async () => {
      try {
        const response = await fetch(url)
        return await response.json()
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData().then((data) => setData(data)) // Call the async function
  }, [enabled, url, formatterFn])
}

export default function getLocalCardData(
  taxonID: number | undefined,
): WilderKindCardType[] | void {
  if (!taxonID) console.log("Card id not found")
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${JSON_SERVER_URL}/cards?taxon_id=${taxonID}`,
      )
      const json = await response.json()
      console.log(json)
      return json
    } catch (error) {
      return console.error("Error fetching card ID:", error)
    }
  }
  fetchData().then((data) => {
    console.log(data)
    return data
  })
}
