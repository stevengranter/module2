import { Link, Outlet, ScrollRestoration } from "react-router-dom"

import { AppShell, Burger, Group, Image, Container } from "@mantine/core"
import { useDisclosure, useHeadroom } from "@mantine/hooks"
import logo from "~/../public/assets/images/logo.png"
import { NavbarSimple } from "~/features/_shared/components/navbar/NavbarSimple.tsx"

export default function DefaultLayout() {
  const [opened, { toggle }] = useDisclosure()
  const pinned = useHeadroom({ fixedAt: 150 })

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
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <NavbarSimple onClick={toggle} />
      </AppShell.Navbar>

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
