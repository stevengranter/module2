import {
  IconArchive,
  IconBinoculars,
  IconHome,
  IconLayout,
  IconUsersGroup,
} from "@tabler/icons-react";

export const publicLinks = [
  { icon: IconHome, label: "Home", to: "/" },
  { icon: IconUsersGroup, label: "Users", to: "users" },
  { label: "my WilderNest", icon: IconArchive, to: "/cards" },
  { label: "Collections", icon: IconLayout, to: "/dashboard" },
  { icon: IconBinoculars, label: "Search", to: "/search" },
  { label: "SamplePage", to: "/sample", icon: IconHome },
];
export const userLinks = [
  { icon: IconLayout, label: "Collections", to: "/dashboard" },
];
