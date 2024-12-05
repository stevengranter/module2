import Features from "~/features/home/components/Features.tsx"

const logo = "./assets/images/logo.png"
import { Center, Image, Paper, Text, Title } from "@mantine/core"

export default function WelcomePage() {
  return (
    <>
      <Center>
        <Image src={logo} alt="WilderNest logo" w="50%" mah="300px" pb="2rem" />
      </Center>
      <Paper p="lg" radius="lg" withBorder={true}>
        <Title order={2} c="soil.9" p="xs">
          Welcome to WilderNest!
        </Title>
        <Text p="xs">
          Interested in the natural world? 🌱 Need a way to keep track of all
          your awesome discoveries? Add plants, an️imals, insects and more to
          your nest 🥚, fav them ❤️, or group them by collection.
        </Text>
        <Text p="xs">
          Hoping to see some rare, exotic creatures on an upcoming trip? 🔍
          Search for them and add them to your wishlist so you remember to look
          for them! ⭐
        </Text>
        {/*<Features
         />*/}
      </Paper>
    </>
  )
}
