import { useContext } from "react";

import { NestContext } from "~/features/_shared/contexts/nest/NestProvider.tsx";

export default function useNest() {
  try {
    const context = useContext(NestContext);
    return context && context.nest
      ? { nest: context.nest, collections: context.collections }
      : null;
  } catch (error) {
    console.error(error);
  }
}
