import {
  IconBinoculars,
  IconHome,
  IconLayout,
  IconUsersGroup,
} from "@tabler/icons-react";

export const publicLinks = [
  { icon: IconHome, label: "Home", to: "/" },
  { icon: IconUsersGroup, label: "Users", to: "/users" },
  // { label: "Cards", icon: IconArchive, to: "/cards" },
  { icon: IconLayout, label: "myNest", to: "/dashboard" },
  { icon: IconBinoculars, label: "Search", to: "/search" },
  // { label: "SamplePage", to: "/sample", icon: IconHome },
  // { label: "SampleCard", to: "/sample", icon: IconHome },
];
export const userLinks = [
  { icon: IconLayout, label: "components", to: "/dashboard" },
];
