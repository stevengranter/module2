import { Title } from "@mantine/core";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import CollectionView from "~/features/dashboard/pages/CollectionView.tsx";
import CollectionViewNew from "~/features/dashboard/pages/CollectionViewNew.tsx";
import GuestInvitation from "~/features/guest-session/components/GuestInvitation.tsx";
import useGuest from "~/features/guest-session/hooks/useGuest.ts";

export default function DashboardPage() {
  const { nest, collections } = useNest();

  return (
    <>
      <CollectionViewNew nest={nest} collections={collections} />
    </>
  );
}
