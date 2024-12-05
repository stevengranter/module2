import Features from "~/features/home/components/Features.tsx"

const logo = "./assets/images/logo.png"
import { Center, Image, Paper, Text, Title } from "@mantine/core"

export default function WelcomePage() {
  return (
    <>
      <Center>
        <Image src={logo} alt="WilderNest logo" w="50%" pb="2rem" />
      </Center>
      <Paper p="lg" radius="lg">
        <Title order={2}>Welcome to WilderNest!</Title>
        <Features />
      </Paper>
    </>
  )
}
