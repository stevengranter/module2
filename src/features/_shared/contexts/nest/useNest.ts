import { useContext } from "react"

import { NestContext } from "~/features/_shared/contexts/nest/NestProvider.tsx"

export default function useNest() {
  const ctx = useContext(NestContext)

  if (ctx === undefined) {
    throw new Error(
      "NestContext can only be used inside a NestProvider" + " tree",
    )
  }

  return ctx
}
