import { ScrollRestoration, Outlet } from "react-router-dom";

import { AppShell, Burger, Group, Image } from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";

import { NavbarSimple } from "../components/ui/navbar/NavbarSimple.tsx";
import { AuthContext } from "../contexts/AuthContext.ts";
import { useAuth } from "../hooks/useAuth.ts";

import logo from "/images/logo2.png";

export default function Layout_Root() {
  const [opened, { toggle }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 150 });
  const { user, setUser } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppShell
        navbar={{
          collapsed: { mobile: !opened },
          breakpoint: "xs",
          width: "200",
        }}
        header={{ collapsed: !pinned, offset: true, height: 150 }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              onClick={toggle}
              opened={opened}
              hiddenFrom="xs"
              size="sm"
            />

            <Image
              alt="WilderNest Logo"
              fit="contain"
              src={logo}
              h="100%"
              w="auto"
              py="lg"
              px="md"
            />
          </Group>
        </AppShell.Header>

        <AppShell.Navbar>
          <NavbarSimple />
        </AppShell.Navbar>

        <AppShell.Main>
          <ScrollRestoration />
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </AuthContext.Provider>
  );
}
