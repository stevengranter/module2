import { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"

import {
  AppShell,
  BackgroundImage,
  Box,
  Center,
  Group,
  Image,
  Paper,
  px,
  rem,
  Text,
} from "@mantine/core"
import { useHeadroom } from "@mantine/hooks"
import {
  IconEgg,
  IconHome,
  IconSailboat,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react"

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
  const pinned = useHeadroom({ fixedAt: 120 })
  return (
    <AppShell
      header={{ height: rem(150), collapsed: !pinned, offset: true }}
      padding="lg"
    >
      <AppShell.Header withBorder={false}>
        <Center>
          <Box p="lg">
            <Image src={logo} alt="Logo" h={150} />
          </Box>
        </Center>
      </AppShell.Header>
      <AppShell.Main>
        <Paper p="lg" radius="lg" m="lg" className={styles.softwhite}>
          <Outlet />
        </Paper>
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Center>
          <Paper p="lg" w="100%" bg="green">
            <Group justify="space-between">
              <Link to="/users">
                <IconUsers size={75}></IconUsers>
              </Link>
              <Link to="/dashboard">
                <IconEgg size={75}></IconEgg>
              </Link>
              <Link to="/search">
                <IconSearch size={75}></IconSearch>
              </Link>
            </Group>
          </Paper>
        </Center>
      </AppShell.Footer>
    </AppShell>
  )
}
