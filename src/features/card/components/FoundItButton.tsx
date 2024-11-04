import { useContext, useState } from "react";

import { Button } from "@mantine/core";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";
import { CollectionDropdown } from "~/features/card/components/CardCollection/CollectionDropdown.tsx";

export default function FoundItButton(props: {
  id: number | string | undefined;
}) {
  const [opened, setOpened] = useState(false);
  // const { collections } = useNest();

  return (
    <>
      <Button onClick={() => setOpened(!opened)}>
        Add/Remove to collection
      </Button>{" "}
      {opened && <CollectionDropdown taxonId={props.id} />}
    </>
  );
}
