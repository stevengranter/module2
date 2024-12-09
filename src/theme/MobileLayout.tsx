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
      footer={{ height: rem(80), collapsed: isDesktop }}
      navbar={{
        width: rem(200),
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      p="lg"
    >
      <AppShell.Navbar withBorder={false}>
        <NavbarSimple />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Group
          justify="space-around"
          align="center"
          // bg="orange"
          className={styles.mobile_toolbar}
          bottom="0"
          py="sm"
        >
          <Link to="/">
            <ActionIcon variant="transparent" color="white" size={60}>
              <IconHome className={styles.footer_icon}></IconHome>
            </ActionIcon>
          </Link>

          <Link to="/collections">
            <ActionIcon variant="transparent" color="white" size={60}>
              <IconCards
                // style={{ width: "auto", height: rem(60) }}
                className={styles.footer_icon}
              ></IconCards>
            </ActionIcon>
          </Link>
          <Link to="/search">
            <ActionIcon variant="transparent" color="white" size={60}>
              <IconSearch
                // style={{ width: "auto", height: rem(60) }}
                className={styles.footer_icon}
              ></IconSearch>
            </ActionIcon>
          </Link>
        </Group>
        {/*</Paper>*/}
      </AppShell.Footer>
    </AppShell>
  )
}
