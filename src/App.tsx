import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import ReactDOM from "react-dom/client";
import { router } from "routes.tsx";
import { defaultTheme } from "theme/defaultTheme";

import { AuthProvider } from "./contexts/AuthProvider.tsx";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <ColorSchemeScript defaultColorScheme="auto" />
        <MantineProvider defaultColorScheme="auto" theme={defaultTheme}>
          <Notifications />
          <RouterProvider router={router} />
        </MantineProvider>
      </AuthProvider>
    </StrictMode>,
  );
}
