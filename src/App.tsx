import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import RoleContextProvider from "~/contexts/RoleContextProvider.tsx";
import ReactDOM from "react-dom/client";
import { router } from "routes.tsx";
import { defaultTheme } from "theme/defaultTheme";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RoleContextProvider>
        <ColorSchemeScript defaultColorScheme="auto" />
        <MantineProvider defaultColorScheme="auto" theme={defaultTheme}>
          <ModalsProvider />
          <Notifications position="top-center" />
          <RouterProvider router={router} />
        </MantineProvider>
      </RoleContextProvider>
    </StrictMode>,
  );
}
