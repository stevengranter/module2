import Features from "~/features/home/components/Features.tsx"

const logo = "./assets/images/logo.png"
import { Image, Paper, Text } from "@mantine/core"

export default function WelcomePage() {
  return (
    <>
      <Image src={logo} alt="WilderNest logo" />

      <Paper>
        <Text>Welcome</Text>
        <Features />
      </Paper>
    </>
  )
}
