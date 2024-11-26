import { useContext } from "react"

import { CollectionsContext } from "~/features/_shared/contexts/collections/CollectionsProvider.tsx"
import { Collection } from "~/features/_shared/contexts/nest/NestProvider.types.ts"
import { Updater } from "use-immer"

type CollectionsContextState = [Collection[], Updater<Collection[]>]

export function useCollections(): CollectionsContextState {
  const context = useContext(CollectionsContext)
  if (!context) {
    throw new Error("useCollections must be used within a CollectionsProvider")
  }
  return context
}
