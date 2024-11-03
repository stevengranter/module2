import { useContext } from "react";

import { NestContext } from "~/features/nest/NestProvider.tsx";

export default function useNest() {
  const ctx = useContext(NestContext) as NestContext | null;
  if (!ctx) {
    return console.log("useNest must be used inside a NestProvider");
  }
  return ctx;
}
