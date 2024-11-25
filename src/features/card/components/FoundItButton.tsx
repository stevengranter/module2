import { useState } from "react"

import { Button, ButtonProps } from "@mantine/core"
import { CollectionDropdown } from "~/features/card/components/CardCollection/CollectionDropdown.tsx"

interface FoundItButtonProps extends ButtonProps {
  id: number | string
}

export default function FoundItButton({ id, ...props }: FoundItButtonProps) {
  const [opened, setOpened] = useState(false)
  // const { collections } = useNest();

  return (
    <>
      <Button onClick={() => setOpened(!opened)}>Add +</Button>{" "}
      {opened && <CollectionDropdown taxonId={id} {...props} />}
    </>
  )
}
