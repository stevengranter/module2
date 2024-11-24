// NestContext.tsx
import React, { createContext, ReactNode, useContext } from "react"

import useStorageSyncedImmerState from "~/features/_shared/hooks/useLocalSyncedImmerState.ts"

type NestState = string[]

const initialNest: NestState = ["48586", "48984", "81545"]

type NestContextData = NestState

export const NestContext = createContext<NestContextData | undefined>(undefined)

export function useNest(): NestContextData {
  const context = useContext(NestContext)
  if (!context) {
    throw new Error("useNest must be used within a NestProvider")
  }
  return context
}

export default function NestProvider({ children }: { children: ReactNode }) {
  const [nest, setNest] = useStorageSyncedImmerState(initialNest, "nestData")

  return <NestContext.Provider value={nest}>{children}</NestContext.Provider>
}
