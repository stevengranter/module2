import { useContext } from "react";

import { Button, ButtonProps } from "@mantine/core";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import { RoleContext } from "~/contexts/RoleContextProvider.tsx";
import { useUser } from "~/hooks/useUser.ts";

export default function LoginLogoutButton(props: ButtonProps) {
  const { isAuthenticated } = useContext(RoleContext);
  const { login, logout } = useUser();

  if (!isAuthenticated) {
    return (
      <Button
        onClick={login}
        variant="outline"
        leftSection={<IconLogin />}
        {...props}
      >
        Login
      </Button>
    );
  } else {
    return (
      <Button
        onClick={logout}
        variant="transparent"
        leftSection={<IconLogout />}
        {...props}
      >
        Logout
      </Button>
    );
  }
}
