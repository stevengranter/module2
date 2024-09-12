import {
  IconArchive,
  IconBinoculars,
  IconHome,
  IconLayout,
  IconUserCircle,
  IconUsersGroup,
} from "@tabler/icons-react";

export const publicLinks = [
  { icon: IconHome, label: "Home", to: "/" },
  { icon: IconUsersGroup, label: "Users", to: "users" },
  { label: "WilderKind Index", icon: IconArchive, to: "/cards" },
  { icon: IconBinoculars, label: "Search", to: "/search" },
];
export const userLinks = [
  { icon: IconLayout, label: "Dashboard", to: "/dashboard" },
];
