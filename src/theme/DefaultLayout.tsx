import { Link, Outlet, ScrollRestoration } from "react-router-dom"

import { AppShell, Burger, Group, Image, rgba, Container } from "@mantine/core"
import { useDisclosure, useHeadroom } from "@mantine/hooks"
import logo from "~/../public/assets/images/logo.png"
import { NavbarSimple } from "~/features/_shared/components/navbar/NavbarSimple.tsx"

export default function DefaultLayout() {
  // const { user } = useContext(RoleContext);
  // const theme = useMantineTheme()
  const [opened, { toggle }] = useDisclosure()
  const pinned = useHeadroom({ fixedAt: 150 })

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <AppShell
      navbar={{
        collapsed: { desktop: opened, mobile: !opened },
        breakpoint: "xs",
        width: "200",
      }}
      header={{ collapsed: !pinned, offset: true, height: 175 }}
      footer={{
        collapsed: true,
        height: 100,
      }}
      // padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="left" align="center">
          <Burger onClick={toggle} opened={!opened} size="sm" />

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

          {/*<Group gap="xl">*/}
          {/*  <Link to="/dashboard">*/}
          {/*    <Stack align="center" justify="center" gap="0">*/}
          {/*      <Image*/}
          {/*        alt="illustration: a bird's nest with three bright blue eggs in it"*/}
          {/*        src={nestImage}*/}
          {/*        h="85"*/}
          {/*        m="xs"*/}
          {/*      />*/}
          {/*      <Text>myNest</Text>*/}
          {/*    </Stack>*/}
          {/*  </Link>*/}
          {/*  <Link to="/search">*/}
          {/*    <Stack align="center" justify="center" gap="0">*/}
          {/*      <Image*/}
          {/*        alt="illustration: a magnifying glass showing a ladybug on a blade of grass"*/}
          {/*        src={searchImage}*/}
          {/*        h="80"*/}
          {/*        m="xs"*/}
          {/*      />*/}
          {/*      <Text>search</Text>*/}
          {/*    </Stack>*/}
          {/*  </Link>*/}
          {/*</Group>*/}
        </Group>
      </AppShell.Header>

      {/*  TODO: Define styles in external css*/}
      <AppShell.Navbar>
        <NavbarSimple onClick={toggle} />

        {/*{user && user.username}*/}
      </AppShell.Navbar>

      {/*  TODO: Define styles in external css*/}
      <AppShell.Main
        style={{ backgroundColor: "transparent", paddingTop: "200px" }}
      >
        <ScrollRestoration />
        {/* Container is REQUIRED here to prevent horizontal in Grid component //*/}
        {/* due to negative margins (see: https://v6.mantine.dev/core/grid/)*/}
        <Container>
          <Outlet />
        </Container>
      </AppShell.Main>

      <AppShell.Footer
        id="footer"
        style={{ position: "relative" }}
      ></AppShell.Footer>
    </AppShell>
  )
}
