import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import FeaturedCards from "~/features/card/components/FeaturedCards.tsx";
import useGuest from "~/features/guest-session/hooks/useGuest.ts";

type GuestInvitationProps = {
  message?: string;
};

const starterCollection = [48987, 81545, 56083];

export default function GuestInvitation({ message }: GuestInvitationProps) {
  const { isGuest } = useGuest();

  return (
    !isGuest && (
      <>
        {message}

        <CardCollection itemIdArray={starterCollection} />
      </>
    )
  );
}
