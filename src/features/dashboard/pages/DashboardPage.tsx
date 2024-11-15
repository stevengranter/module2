import { NestProviderState } from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";
import CollectionView from "~/features/dashboard/pages/CollectionView.tsx";

export default function DashboardPage() {
  const { nest, collections } = useNest() as NestProviderState;

  return (
    <>
      <CollectionView nest={nest} collections={collections} />
    </>
  );
}
