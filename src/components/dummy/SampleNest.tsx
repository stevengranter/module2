import { useContext } from "react";

import { Button, Title } from "@mantine/core";
import { NestContext } from "~/features/nest/NestProvider.tsx";

export default function SampleNest() {
  const { nest, getNest, saveNest } = useContext(NestContext);
  return (
    <>
      <Title order={2}>Sample Nest</Title>
      <Button onClick={getNest}>Get Nest</Button>
      <Button onClick={saveNest}>Save Nest</Button>
      <Button onClick={updateGuest}></Button>
    </>
  );
}
