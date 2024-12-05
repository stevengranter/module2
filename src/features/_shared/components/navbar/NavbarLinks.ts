import {
  IconBinoculars,
  IconCards,
  IconEgg,
  IconHome,
  IconLayout,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react"

export const publicLinks = [
  { icon: IconHome, label: "Home", to: "/" },

  { icon: IconCards, label: "Collections", to: "/dashboard" },
  { icon: IconSearch, label: "Search", to: "/search" },
]

export const adminLinks = [
  { icon: IconUsersGroup, label: "Users", to: "/users" },
]
