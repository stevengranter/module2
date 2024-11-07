import { Title } from "@mantine/core";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import CollectionView from "~/features/dashboard/pages/CollectionView.tsx";
import GuestInvitation from "~/features/guest-session/components/GuestInvitation.tsx";
import useGuest from "~/features/guest-session/hooks/useGuest.ts";

export default function DashboardPage() {
  const { isGuest, guestData } = useGuest();
  const { nest, collections } = guestData;

  if (!isGuest) {
    return (
      <>
        <GuestInvitation message="Get the starter pack" />
      </>
    );
  }

  return (
    <>
      <CollectionView nest={nest} collections={collections} />
    </>
  );
}
