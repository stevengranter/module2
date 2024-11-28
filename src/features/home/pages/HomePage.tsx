import { Grid, Image, SimpleGrid, Text, Title } from "@mantine/core"

import Features from "../components/Features.tsx"

import logo from "/images/logo.png"

export default function HomePage() {
  return (
    <Grid m={0}>
      <Grid.Col span={{ base: 12, md: 5 }}>
        {/*<Image src={logo} />*/}
        <Title order={2}>Welcome</Title>
        <Text>
          Welcome to WilderNest, a playground for nature enthusiasts and curious
          explorers! 🌿✨ Add all the fascinating insects, wildlife, and plants
          you’ve discovered in the great outdoors. Get ready to embark on a wild
          journey — because every find is a treasure waiting to be added to your
          nest! 🐦🌼🐞
        </Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 7 }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
          <Features />
        </SimpleGrid>
      </Grid.Col>
    </Grid>
  )
}
