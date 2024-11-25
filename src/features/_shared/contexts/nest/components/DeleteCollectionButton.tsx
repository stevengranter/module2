import { Button } from "@mantine/core"
import useNest from "~/features/_shared/contexts/nest/useNest.ts"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.ts"

type Props = {
  collectionId: string
}

export default function DeleteCollectionButton({ collectionId }: Props) {
  const collectionAction = useCollectionActions()

  function handleClick() {
    collectionAction.deleteCollection(collectionId)
  }

  return <Button onClick={handleClick}>Delete Collection</Button>
}
