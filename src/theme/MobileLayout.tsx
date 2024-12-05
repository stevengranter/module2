import { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"

import {
  ActionIcon,
  AppShell,
  BackgroundImage,
  Box,
  Center,
  Flex,
  Group,
  Image,
  Paper,
  px,
  rem,
  Text,
} from "@mantine/core"
import { useHeadroom, useMediaQuery } from "@mantine/hooks"
import {
  IconBinoculars,
  IconCards,
  IconEgg,
  IconHome,
  IconSailboat,
  IconSearch,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react"
import { NavbarSimple } from "~/features/_shared/components/navbar/NavbarSimple.tsx"
import { defaultTheme } from "~/theme/defaultTheme.ts"
import { min } from "lodash"

import styles from "./MobileLayout.module.css"

const backgroundImage = "./assets/images/ui/forest-bg-01.png"
const logo = "./assets/images/logo.png"
export default function MobileLayout() {
  useEffect(() => {
    const originalBackground = document.body.style.backgroundImage

    document.body.style.backgroundImage = `url(${backgroundImage})`
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundPosition = "top"
    document.body.style.backgroundAttachment = "fixed"
    document.body.style.background
    document.body.style.backgroundColor = "#56CADA"
    console.log({ styles })

    // Cleanup on unmount
    return () => {
      document.body.style.backgroundImage = originalBackground
    }
  }, [])
  // const pinned = useHeadroom({ fixedAt: 10 })

  const mediaQuery = `(min-width: 64em)`

  const isDesktop = useMediaQuery(mediaQuery)

  return (
    <AppShell
      layout="alt"
      // header={{ height: rem(270), collapsed: !pinned, offset: true }}
      // header={{ height: rem(120), collapsed: !pinned, offset: true }}
      footer={{ height: 110, collapsed: isDesktop }}
      navbar={{
        width: rem(200),
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="lg"
    >
      {/*<AppShell.Header withBorder={false}>*/}
      {/*  <Center>*/}
      {/*    <Box p="lg">*/}
      {/*      <Link to="/">*/}
      {/*        <Image src={logo} alt="Logo" h={80} />*/}
      {/*      </Link>*/}
      {/*    </Box>*/}
      {/*  </Center>*/}
      {/*</AppShell.Header>*/}
      <AppShell.Navbar withBorder={false}>
        <NavbarSimple />

        {/*{user && user.username}*/}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
        {/*<Paper p="lg" radius="lg" m="lg" className={styles.softwhite}>*/}
        {/*  <Outlet />*/}
        {/*</Paper>*/}
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Center>
          <Paper p="lg" w="100%" className={styles.mobile_toolbar} radius="0">
            <Group justify="space-between" px="lg">
              <Link to="/">
                <ActionIcon variant="transparent" color="white" size={80}>
                  <IconHome
                    style={{ width: "auto", height: "100%" }}
                    className={styles.footer_icon}
                  ></IconHome>
                </ActionIcon>
              </Link>
              {/*<Link to="/users">*/}
              {/*  <ActionIcon variant="transparent" color="white" size={80}>*/}
              {/*    <IconUsersGroup*/}
              {/*      style={{ width: "auto", height: "80%" }}*/}
              {/*      stroke={1.5}*/}
              {/*    ></IconUsersGroup>*/}
              {/*  </ActionIcon>*/}
              {/*</Link>*/}
              <Link to="/dashboard">
                <ActionIcon variant="transparent" color="white" size={80}>
                  <IconCards className={styles.footer_icon}></IconCards>
                </ActionIcon>
              </Link>
              <Link to="/search">
                <ActionIcon variant="transparent" color="white" size={80}>
                  <IconSearch className={styles.footer_icon}></IconSearch>
                </ActionIcon>
              </Link>
            </Group>
          </Paper>
        </Center>
      </AppShell.Footer>
    </AppShell>
  )
}
