import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

// imports for @mantine (UI component library)
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

// imports for React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import components
import RootLayout from './layouts/Root';
import IndexRoute from './routes/Index';
import WelcomePage from './pages/Welcome';
import ProfileRoute from './routes/Profile';
import CollectionRoute from './routes/Collection';
import NurseryRoute from './routes/Nursery';
import PlayroomRoute from './routes/Playroom';
import NestRoute from './routes/Nest';
import AboutPage from './pages/About';
import ErrorPage from './ErrorPage';

// define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: '/home', element: <IndexRoute /> },
      { path: '/profile', element: <ProfileRoute /> },
      {
        path: '/collection',
        element: <CollectionRoute />,
      },
      { path: '/nursery', element: <NurseryRoute /> },
      { path: '/playroom', element: <PlayroomRoute /> },
      {
        path: '/nest',
        element: <NestRoute />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorSchemeScript defaultColorScheme='auto' />
    <MantineProvider defaultColorScheme='auto'>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
