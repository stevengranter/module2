import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import ReactDOM from "react-dom/client";
import { defaultTheme } from "theme/defaultTheme";

import { router } from "routes/routes.tsx";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto" theme={defaultTheme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </StrictMode>,
  );
}
