import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

// imports for @mantine (UI component library)
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

// imports for React Router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import components
import Root from './routes/root.jsx';
import BugsRoute from './routes/bugs.jsx';
import ErrorPage from "./ErrorPage.jsx";

// define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/bugs",
        element: <BugsRoute />
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode >
);
