import { NestProviderState } from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";
import CollectionViewNew from "~/features/dashboard/pages/CollectionViewNew.tsx";

export default function DashboardPage() {
  const { nest, collections } = useNest() as NestProviderState;

  return (
    <>
      <CollectionViewNew nest={nest} collections={collections} />
    </>
  );
}
