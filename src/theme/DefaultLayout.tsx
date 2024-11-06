import { Link, Outlet, ScrollRestoration } from "react-router-dom";

import {
  AppShell,
  Burger,
  Group,
  Image,
  rgba,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { NavbarSimple } from "~/features/_shared/components/navbar/NavbarSimple.tsx";
import LoginLogoutButton from "~/features/local-user/components/LoginLogoutButton.tsx";

import logo from "/images/logo2.png";

export default function DefaultLayout() {
  // const { user } = useContext(RoleContext);
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();
  const pinned = useHeadroom({ fixedAt: 150 });

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <AppShell
      navbar={{
        collapsed: { desktop: !opened, mobile: !opened },
        breakpoint: "xs",
        width: "200",
      }}
      header={{ collapsed: !pinned, offset: true, height: 150 }}
      padding="md"
    >
      <AppShell.Header style={{ backgroundColor: "transparent" }}>
        <Group h="100%" px="md" justify="space-between" align="center">
          <Burger onClick={toggle} opened={opened} hiddenFrom="xs" size="sm" />

          <Link to="/">
            <Image
              alt="WilderNest Logo"
              fit="contain"
              src={logo}
              h="200px"
              w="auto"
              py="lg"
              px="md"
            />
          </Link>

          <Link to="/dashboard">
            <Text>myNest</Text>
          </Link>
          <Link to="/search">
            <Text>Search</Text>
          </Link>
          <LoginLogoutButton />
        </Group>
      </AppShell.Header>

      {/*  TODO: Define styles in external css*/}
      <AppShell.Navbar style={{ backgroundColor: rgba("#C7F17A", 1) }}>
        <NavbarSimple />
        {/*{user && user.username}*/}
      </AppShell.Navbar>

      {/*  TODO: Define styles in external css*/}
      <AppShell.Main
        style={{ backgroundColor: "transparent", paddingTop: "200px" }}
      >
        <ScrollRestoration />
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
