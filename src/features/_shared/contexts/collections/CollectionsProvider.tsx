// CollectionsContext.tsx
import React, { createContext, ReactNode, useContext } from "react"

import { Collection } from "~/features/_shared/contexts/nest/NestProvider.types.ts"
import useStorageSyncedImmerState from "~/features/_shared/hooks/useLocalSyncedImmerState.ts"

type CollectionsState = Collection[];

const initialCollections: CollectionsState = [
    {
        name: "Starter Pack",
        id: crypto.randomUUID(),
        items: ["48586", "48987", "81545"],
    },
    { name: "Favorites", id: crypto.randomUUID(), items: [] },
]

type CollectionsContextData = CollectionsState;

const CollectionsContext = createContext<CollectionsContextData | undefined>(undefined)

export function useCollections(): CollectionsContextData {
    const context = useContext(CollectionsContext)
    if (!context) {
        throw new Error("useCollections must be used within a CollectionsProvider")
    }
    return context
}

// Provider component
export default function CollectionsProvider({ children }: { children: ReactNode }) {
    const [collections, setCollections] = useStorageSyncedImmerState(
        initialCollections,
        "collectionsData"
    )

    return (
        <CollectionsContext.Provider value={collections}>
            {children}
        </CollectionsContext.Provider>
    )
}
