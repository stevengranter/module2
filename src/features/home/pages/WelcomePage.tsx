import { Link } from "react-router-dom"

const logo = "./assets/images/logo.png"
import { Alert, Center, Image, Text, Title } from "@mantine/core"
import {
  IconAlertTriangle,
  IconAlertTriangleFilled,
  IconInfoCircle,
} from "@tabler/icons-react"
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
          favorites ❤️, or group them into your own{" "}
          <Link to="/collections">collections</Link>.
        </Text>
        <Text py="xs">
          Hoping to see some rare, exotic creatures on an upcoming trip?{" "}
          <Link to="/search">Search 🔍</Link>, then add them to your wishlist so
          you remember to look for them! ⭐
        </Text>
        <Alert
          variant="light"
          color="orange"
          radius="md"
          // title="Note"
          icon={<IconAlertTriangle />}
        >
          All data entered is stored in localStorage in your web browser on your
          own device. No user data is stored or backed up online.
        </Alert>
        {/*<Features
         />*/}
      </DefaultPaper>
    </>
  )
}
