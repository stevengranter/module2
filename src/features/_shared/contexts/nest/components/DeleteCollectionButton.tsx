import { Button } from "@mantine/core";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";

type Props = {
  collectionId: string;
};

export default function DeleteCollectionButton({ collectionId }: Props) {
  const { nest, collections } = useNest();

  function handleClick() {
    collections.delete(collectionId);
  }

  return <Button onClick={handleClick}>Delete Collection</Button>;
}
