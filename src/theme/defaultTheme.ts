import { createTheme } from "@mantine/core"

export const defaultTheme = createTheme({
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "100em",
    xxl: "135em",
  },
  primaryColor: "teal",
  colors: {
    teal: [
      "#effbf7",
      "#e0f3ee",
      "#bae8db",
      "#92dcc7",
      "#73d3b7",
      "#5fccac",
      "#53c9a6",
      "#43b191",
      "#379e80",
      "#25896e",
    ],
    darkteal: [
      "#239582",
      "#208978",
      "#1d7e6e",
      "#1a7364",
      "#17685b",
      "#145d51",
      "#115248",
      "#0e483f",
      "#0c3e36",
      "#09342d",
    ],
  },
  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
  },
})
