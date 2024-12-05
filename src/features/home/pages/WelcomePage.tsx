import Features from "~/features/home/components/Features.tsx"

const logo = "./assets/images/logo.png"
import { Center, Image, Paper, Text } from "@mantine/core"

export default function WelcomePage() {
  return (
    <>
      <Center>
        <Image src={logo} alt="WilderNest logo" w="50%" />
      </Center>
      <Paper>
        <Text>Welcome</Text>
        <Features />
      </Paper>
    </>
  )
}
