import { useContext } from "react"

import { Title } from "@mantine/core"
import ToggleGuestSessionButton from "~/features/guest-session/components/ToggleGuestSessionButton.tsx"
import useGuest from "~/features/guest-session/hooks/useGuest.ts"

export function SampleGuest() {
  const { isGuest, startGuestSession, endGuestSession } =
    useContext(GuestSessionContext) 
  return (
    <>
      <Title order={2}>Sample Guest</Title>
      <ToggleGuestSessionButton />
    </>
  )
}
