// CollectionsContext.tsx
import React, { createContext, ReactElement, ReactNode } from "react"

import { Combobox } from "@mantine/core"
import { useLogger } from "~/dev.ts"
import { Collection } from "~/features/_shared/contexts/nest/NestProvider.types.ts"
import useStorageSyncedImmerState from "~/features/_shared/hooks/useLocalSyncedImmerState.ts"
import { Updater } from "use-immer"

import Search = Combobox.Search

const initialCollections: Collection[] = [
  {
    name: "Starter Pack",
    id: crypto.randomUUID(),
    items: ["12727", "48586", "48987"],
    description: `This is your starter pack. Add them to your favorites by clicking the heart ❤️ icon, or your wishlist by clicking the star ⭐️. Add more animals by using <a href='/search'>Search</Link>.`,
  },
  { name: "Favorites", id: crypto.randomUUID(), items: [] },
]

type CollectionsContextState = [Collection[], Updater<Collection[]>]

export const CollectionsContext = createContext<CollectionsContextState | null>(
  null,
)

// Provider component
export default function CollectionsProvider({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const [state, updater] = useStorageSyncedImmerState(
    initialCollections,
    "collectionsData",
  )

  useLogger("CollectionsProvider", [state])

  return (state && (
    <CollectionsContext.Provider
      value={[state as Collection[], updater as Updater<Collection[]>]}
    >
      {children}
    </CollectionsContext.Provider>
  )) as ReactElement
}
