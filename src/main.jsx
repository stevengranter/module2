import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

// imports for @mantine (UI component library)
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

// imports for React Router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import components
import Root from './routes/root';
import Index from './routes/index';
import CollectionRoute from './routes/collection.jsx';
import ErrorPage from "./ErrorPage.jsx";

// define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "/collection",
        element: <CollectionRoute />
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider defaultColorScheme="auto">
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode >
);
