import { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"

import { Box, Center, Group, Image, Paper, px, rem, Text } from "@mantine/core"
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

  return (
    <>
      <header>
        <Center>
          <Image src={logo} alt="logo" p="lg" w="200px" h="auto" />
        </Center>
      </header>
      <main>
        <Box
          style={{
            overflow: "scroll",
          }}
          bg="rgba(255, 255, 255, 0.8)"
          p="lg"
        >
          <Outlet />
        </Box>
      </main>

      <footer>
        <Center>
          <Paper
            className={styles.footer}
            shadow="xs"
            p="lg"
            radius="xl"
            w="90%"
            m="xl"
          >
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
      </footer>
    </>
  )
}
