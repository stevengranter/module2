import { useState } from "react";

import { Button } from "@mantine/core";
import { CollectionDropdown } from "~/components/ui/controls/CollectionDropdown.tsx";

export default function FoundItButton(props: {
  id: number | string | undefined;
}) {
  const [opened, setOpened] = useState(false);

  function createCollection() {}

  return (
    <>
      <Button onClick={() => setOpened(!opened)}>
        Add/Remove to collection
      </Button>{" "}
      {opened && <CollectionDropdown taxonId={props.id} />}
    </>
  );
}
