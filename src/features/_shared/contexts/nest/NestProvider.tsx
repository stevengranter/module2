// NestContext.tsx
import React, { createContext, ReactNode, useContext } from "react"

import { Collection } from "~/features/_shared/contexts/nest/NestProvider.types.ts"
import useStorageSyncedImmerState from "~/features/_shared/hooks/useLocalSyncedImmerState.ts"
import { Draft } from "immer"

const initialNest: string[] = ["48586", "48984", "81545"]

type NestContextData = [
  typeof initialNest,
  (draft: (draft: Draft<string[]>) => void) => void,
]

export const NestContext = createContext<NestContextData | undefined>(undefined)

export function useNest(): NestContextData {
  const context = useContext(NestContext)
  if (!context) {
    throw new Error("useNest must be used within a NestProvider")
  }
  return context
}

export default function NestProvider({ children }: { children: ReactNode }) {
  const [state, updater] = useStorageSyncedImmerState(initialNest, "nestData")

  return (
    <NestContext.Provider value={[state, updater]}>
      {children}
    </NestContext.Provider>
  )
}
