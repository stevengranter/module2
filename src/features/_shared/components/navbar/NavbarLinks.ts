import {
  IconBinoculars,
  IconEgg,
  IconHome,
  IconLayout,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react"

export const publicLinks = [
  { icon: IconHome, label: "Home", to: "/" },
  { icon: IconUsersGroup, label: "Users", to: "/users" },
  { icon: IconEgg, label: "myNest", to: "/dashboard" },
  { icon: IconSearch, label: "Search", to: "/search" },
  //TODO: Remove below
  { icon: IconBinoculars, label: "OtherSearch", to: "/othersearch" },
]
