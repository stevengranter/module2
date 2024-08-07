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
import UserProfile from './components/UserProfile';
import Collection from './routes/collection';
import Nursery from './routes/nursery';
import Playroom from './routes/playroom';
import Nest from './routes/nest';
import About from './routes/about';
import ErrorPage from "./ErrorPage";

// define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {path: "/profile",
        element: <UserProfile />
      },
      {
        path: "/collection",
        element: <Collection />
      },
      { path: "/nursery",
        element: <Nursery />
      },
      {path: "/playroom",
        element: <Playroom />
      },
      {
        path: "/nest",
        element: <Nest/>
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider defaultColorScheme="auto">
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode >
);
