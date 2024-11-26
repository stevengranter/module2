import React, { createContext, ReactNode } from "react"

import useLocalSyncedImmerState from "~/features/_shared/hooks/useLocalSyncedImmerState.ts"
import { Updater } from "use-immer"

const initialNest: string[] = ["48586", "48984", "81545"]

type NestContextData = [string[], Updater<string[]>]

export const NestContext = createContext<NestContextData | undefined>(undefined)

export default function NestProvider({ children }: { children: ReactNode }) {
  const [state, updater] = useLocalSyncedImmerState(initialNest, "nestData")

  return (
    <NestContext.Provider value={[state, updater]}>
      {children}
    </NestContext.Provider>
  )
}
