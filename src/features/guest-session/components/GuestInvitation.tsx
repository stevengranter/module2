import useGuest from "~/features/guest-session/hooks/useGuest.ts";

type GuestInvitationProps = {
  message?: string;
};

export default function GuestInvitation({ message }: GuestInvitationProps) {
  const { isGuest } = useGuest();

  return !isGuest && <>{message}</>;
}
