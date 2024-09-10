import { useEffect, useState } from "react";

import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";

import useAuth from "../../../hooks/useAuth.ts";
// import useUser from "../../../hooks/useUser.ts";

export default function AddToCollectionButton() {
  const { user } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [user]);

  return (
    isAuthorized && (
      <Button
        onClick={() =>
          notifications.show({
            title: "oh no!",
            message: "User not logged in",
          })
        }
        leftSection={<IconPlus />}
      >
        Add to collection
      </Button>
    )
  );
}
