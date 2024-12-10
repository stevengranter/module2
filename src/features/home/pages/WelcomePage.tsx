const logo = "./assets/images/logo.png"
import { Center, Image, Text, Title } from "@mantine/core"
import DefaultPaper from "~/features/_shared/components/DefaultPaper.tsx"

export default function WelcomePage() {
  return (
    <>
      <Center>
        <Image
          src={logo}
          alt="WilderNest logo"
          w="50%"
          mah="300px"
          pb="2rem"
          style={{ filter: "drop-shadow(0px 5px 8px rgba(0, 0, 0, 0.4))" }}
        />
      </Center>
      <DefaultPaper>
        <Title order={1}>Welcome to WilderNest!</Title>
        <Text py="xs">
          Interested in the natural world? 🌱 Need a way to keep track of all
          your awesome discoveries? Add plants, an️imals, insects and your
          favorites ❤️, or group them into your own collections.
        </Text>
        <Text py="xs">
          Hoping to see some rare, exotic creatures on an upcoming trip? 🔍
          Search, then add them to your wishlist so you remember to look for
          them! ⭐
        </Text>
        {/*<Features
         />*/}
      </DefaultPaper>
    </>
  )
}
