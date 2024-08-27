import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
// @mantine imports
import "@mantine/core/styles.css";
import ReactDOM from "react-dom/client";
import { router } from "routes.tsx";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        <RouterProvider router={router} />
      </MantineProvider>
    </StrictMode>,
  );
}
