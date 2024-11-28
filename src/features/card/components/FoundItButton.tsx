import { useState } from "react"

import { Button, ButtonProps } from "@mantine/core"
import { CollectionDropdown } from "~/features/card/components/CardCollection/CollectionDropdown.tsx"

interface FoundItButtonProps extends ButtonProps {
  id: number | string
}

export default function FoundItButton({ id, ...props }: FoundItButtonProps) {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Button color="rgba(123,172,30,1)" onClick={() => setOpened(!opened)}>
        Add +
      </Button>{" "}
      {opened && <CollectionDropdown taxonId={id} {...props} />}
    </>
  )
}
