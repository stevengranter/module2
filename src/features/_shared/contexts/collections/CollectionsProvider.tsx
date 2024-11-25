// CollectionsContext.tsx
import React, { createContext, ReactNode, useContext } from "react"

import { useLogger } from "@mantine/hooks"
import { Collection } from "~/features/_shared/contexts/nest/NestProvider.types.ts"
import useStorageSyncedImmerState from "~/features/_shared/hooks/useLocalSyncedImmerState.ts"
import { Draft } from "immer"

const initialCollections: Collection[] = [
  {
    name: "Starter Pack",
    id: crypto.randomUUID(),
    items: ["48586", "48987", "81545"],
    description:
      "This is your starter pack. Add them to your favorites by" +
      " clicking the heart icon. Add more animals by using Search.",
  },
  { name: "Favorites", id: crypto.randomUUID(), items: [] },
]

type CollectionsContextState = [
  Collection[],
  (draft: (draft: Draft<Collection[]>) => void) => void,
]

const CollectionsContext = createContext<CollectionsContextState | undefined>(
  undefined,
)

export function useCollections(): CollectionsContextState {
  const context = useContext(CollectionsContext)
  if (!context) {
    throw new Error("useCollections must be used within a CollectionsProvider")
  }
  return context
}

// Provider component
export default function CollectionsProvider({
  children,
}: {
  children: ReactNode
}) {
  const [state, updater] = useStorageSyncedImmerState(
    initialCollections,
    "collectionsData",
  )

  useLogger("CollectionsProvider", [state])

  return (
    state && (
      <CollectionsContext.Provider value={[state, updater]}>
        {children}
      </CollectionsContext.Provider>
    )
  )
}
