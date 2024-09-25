import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import {
  AppShell,
  Burger,
  Button,
  Group,
  Image,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import LoginLogoutButton from "~/components/ui/buttons/LoginLogoutButton.tsx";

import { NavbarSimple } from "./components/ui/navbar/NavbarSimple.tsx";
import useAuth from "./hooks/useAuth.ts";

import logo from "/images/logo2.png";

export default function DefaultLayout() {
  const { user, login, logout, guest, continueAsGuest } = useAuth();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 150 });

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AppShell
      navbar={{
        collapsed: { mobile: !opened },
        breakpoint: "xs",
        width: "200",
      }}
      header={{ collapsed: !pinned, offset: true, height: 150 }}
      padding="md"
    >
      <AppShell.Header style={{ backgroundColor: theme.colors.darkteal[3] }}>
        <Group h="100%" px="md" justify="space-between" align="flex-start">
          <Burger onClick={toggle} opened={opened} hiddenFrom="xs" size="sm" />

          <Image
            alt="WilderNest Logo"
            fit="contain"
            src={logo}
            h="100%"
            w="auto"
            py="lg"
            px="md"
          />
          <LoginLogoutButton />

          {!guest ? (
            <Button onClick={continueAsGuest}>Continue As Guest</Button>
          ) : null}
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
  );
}
