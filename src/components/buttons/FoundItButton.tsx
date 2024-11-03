import { useContext, useState } from "react";

import { Button } from "@mantine/core";
import { CollectionDropdown } from "~/components/controls/CollectionDropdown.tsx";
import useNest from "~/features/nest/useNest.ts";

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
