import { useState } from "react"

import { Button, ButtonProps } from "@mantine/core"
import toTitleCase from "~/features/_shared/utils/toTitleCase.ts"
import { CollectionDropdown } from "~/features/card/components/CardCollection/CollectionDropdown.tsx"
interface FoundItButtonProps extends ButtonProps {
  data: {
    taxonId: number | string
    taxonName: string
    taxonCommonName?: string
  }
}

export default function FoundItButton({
  size,
  data,
  ...props
}: FoundItButtonProps) {
  const [opened, setOpened] = useState(false)
  const { taxonId, taxonName, taxonCommonName } = data
  console.log({ taxonCommonName })

  return (
    <>
      <Button onClick={() => setOpened(!opened)}>
        {opened ? "Hide " : "Add +"}
      </Button>{" "}
      {opened && (
        <CollectionDropdown
          taxonId={taxonId}
          taxonName={taxonName}
          taxonCommonName={taxonCommonName && toTitleCase(taxonCommonName)}
          {...props}
        />
      )}
    </>
  )
}
