import { Link } from "react-router-dom";

import {
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  rem,
  Image,
  Container,
} from "@mantine/core";
import { IconBinoculars, IconUsers } from "@tabler/icons-react";
import { IconLayout } from "~/features/_shared/icons/icons.tsx";
import ToggleGuestSessionButton from "~/features/guest-session/components/ToggleGuestSessionButton.tsx";

import nestImage from "/assets/images/ui/nest-main-01.png";
import searchImage from "/assets/images/ui/search-main-01.png";
import logo from "/images/logo2.png";

const features = [
  {
    icon: IconLayout,
    image: nestImage,
    title: "myNest",
    description: "myNest description",
    path: "/dashboard",
  },
  {
    icon: IconBinoculars,
    image: searchImage,
    title: "Search",
    description: "Search description",
    path: "/search",
  },
];

export default function Features() {
  const items = features.map((feature) => (
    <div key={feature.title}>
      <Link to={feature.path}>
        {feature.image && <Image src={feature.image} />}
        <ThemeIcon
          size={44}
          radius="md"
          variant="gradient"
          gradient={{ deg: 133, from: "blue", to: "cyan" }}
        >
          <feature.icon
            style={{ width: rem(26), height: rem(26) }}
            stroke={1.5}
          />
        </ThemeIcon>
      </Link>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <Grid m={0}>
      <Grid.Col span={{ base: 12, md: 5 }}>
        <Image src={logo} />
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
          {items}
        </SimpleGrid>
      </Grid.Col>
    </Grid>
  );
}
