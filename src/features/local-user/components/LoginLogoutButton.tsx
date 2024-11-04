import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button, ButtonProps } from "@mantine/core";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import { RoleContext } from "~/features/_shared/contexts/RoleContextProvider.tsx";

export default function LoginLogoutButton(props: ButtonProps) {
  const { isAuthenticated, logout } = useContext(RoleContext);
  const navigate = useNavigate();
  // const { login, logout } = useUser();

  if (!isAuthenticated) {
    return (
      <Button
        onClick={() => navigate("/login")}
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
