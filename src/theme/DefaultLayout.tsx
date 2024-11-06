import { Link, Outlet, ScrollRestoration } from "react-router-dom";

import {
  AppShell,
  Burger,
  Group,
  Image,
  rgba,
  useMantineTheme,
  Text,
  Stack,
} from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { NavbarSimple } from "~/features/_shared/components/navbar/NavbarSimple.tsx";
import LoginLogoutButton from "~/features/local-user/components/LoginLogoutButton.tsx";
import CloudBackground from "~/theme/CloudBackground.tsx";

import nestImage from "/assets/images/ui/nest-main-01.png";
import searchImage from "/assets/images/ui/search-main-01.png";
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
      header={{ collapsed: !pinned, offset: true, height: 175 }}
      footer={{
        collapsed: true,
        height: 100,
      }}
      padding="md"
    >
      <AppShell.Header style={{ backgroundColor: "#B1ED5C" }}>
        {/*<CloudBackground />*/}
        <Group h="100%" px="md" justify="space-between" align="center">
          <Burger onClick={toggle} opened={opened} hiddenFrom="xs" size="sm" />

          <Link to="/">
            <Image
              alt="WilderNest Logo"
              fit="contain"
              src={logo}
              h="150"
              pt="10"
              w="auto"
            />
          </Link>

          <Group gap="xl">
            <Link to="/dashboard">
              <Stack align="center" justify="center" gap="0">
                <Image
                  alt="illustration: a bird's nest with three bright blue eggs in it"
                  src={nestImage}
                  h="85"
                  m="xs"
                />
                <Text>myNest</Text>
              </Stack>
            </Link>
            <Link to="/search">
              <Stack align="center" justify="center" gap="0">
                <Image
                  alt="illustraition: a magnifying glass showing a ladybug on a blade of grass"
                  src={searchImage}
                  h="80"
                  m="xs"
                />
                <Text>search</Text>
              </Stack>
            </Link>
          </Group>
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

      <AppShell.Footer
        id="footer"
        style={{ position: "relative" }}
      ></AppShell.Footer>
    </AppShell>
  );
}
