import { Link } from "react-router-dom"

import {
  Title,
  SimpleGrid,
  Text,
  ThemeIcon,
  Grid,
  Image,
  rem,
} from "@mantine/core"
import { IconBinoculars } from "@tabler/icons-react"
import { IconLayout } from "~/features/_shared/icons/icons.tsx"

import nestImage from "/assets/images/ui/nest-main-01.png"
import searchImage from "/assets/images/ui/search-main-01.png"
import logo from "/images/logo2.png"

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
]

export default function Features() {
  // const items = features.map((feature) => (
  //   <div key={feature.title}>
  //     <Link to={feature.path}>
  //       {feature.image && <Image src={feature.image} />}
  //       <ThemeIcon
  //         size={44}
  //         radius="md"
  //         variant="gradient"
  //         gradient={{ deg: 133, from: "blue", to: "cyan" }}
  //       >
  //         <feature.icon
  //           style={{ width: rem(26), height: rem(26) }}
  //           stroke={1.5}
  //         />
  //       </ThemeIcon>
  //     </Link>
  //     <Text fz="lg" mt="sm" fw={500}>
  //       {feature.title}
  //     </Text>
  //     <Text c="dimmed" fz="sm">
  //       {feature.description}
  //     </Text>
  //   </div>
  // ))

  return (
    <>
      {features.map((feature) => (
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
      ))}
    </>
  )
}
