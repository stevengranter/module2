import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import { Button, Flex, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API_SERVER } from "~/features/api/constants.ts"
import { fetchNinjaAPIData } from "~/features/api/fetchServerData.ts"
import {
  AnimalApiRecord,
  AnimalsApiResponse,
} from "~/models/AnimalsApiResponse.ts"
import { values } from "lodash"

const API_URL = "https://api.api-ninjas.com/v1"

type FormValues = {
  name: string
}

export default function SearchOther() {
  // https://api.api-ninjas.com/v1/animals?name=cheetah
  const form = useForm({ mode: "uncontrolled" })
  const queryClient = useQueryClient()

  const [searchParams, setSearchParams] = useSearchParams()

  const { data, error, isLoading } = useQuery({
    queryKey: ["name"],
    queryFn: async () => {
      const data = await fetchNinjaAPIData([
        API_URL,
        `/animals?`,
        `${searchParams}`,
      ])
      return data
    },
    // Only run query if we have searchParams
    enabled: !!searchParams.get("name"),
  })

  useEffect(() => {
    console.log(searchParams.get("name"))
    console.log(data)
    queryClient.invalidateQueries({ queryKey: ["name"] })
  }, [searchParams.get("name")])

  function handleSubmit(values: FormValues) {
    setSearchParams((prev) => {
      prev.set("name", values.name)
      return prev
    })
  }

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values as FormValues))}
      >
        <Flex align="flex-end">
          <TextInput
            placeholder="Enter search terms"
            key={form.key("name")}
            label="SearchPage"
            {...form.getInputProps("name")}
          />
          <Button type="submit">Submit</Button>
        </Flex>
      </form>

      {data &&
        data.length > 0 &&
        data.map((animal: AnimalApiRecord) => <li>{animal.name}</li>)}

      {/*{data &&*/}
      {/*  data.length > 0 &&*/}
      {/*  data.map((animal: AnimalApiRecord) => {*/}
      {/*    let taxonomy*/}
      {/*    if (data.animal.taxonomy) {*/}
      {/*      taxonomy = data.animal.taxonomy.map(*/}
      {/*        (key: string, value: string) => (*/}
      {/*          <li>*/}
      {/*            {key} - {value}*/}
      {/*          </li>*/}
      {/*        ),*/}
      {/*      )*/}
      {/*      return taxonomy*/}
      {/*    }*/}
    </>
  )
}

function AnimalFacts(data: AnimalsApiResponse) {
  return (
    data &&
    data.length > 0 &&
    data.map((animal) => {
      animal.name
    })
  )
}
