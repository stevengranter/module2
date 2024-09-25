import { useContext } from "react";

import { Button } from "@mantine/core";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import { RoleContext } from "~/contexts/RoleContextProvider.tsx";
import { login, logout } from "~/lib/utils.ts";

export default function LoginLogoutButton(props: any) {
  const { isAuthenticated } = useContext(RoleContext);

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
