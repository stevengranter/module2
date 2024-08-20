import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
// @mantine imports
import '@mantine/core/styles.css';
import ReactDOM from 'react-dom/client';

import {
  loader as CardDetailLoader,
  CardDetailRoute,
} from './routes/Cards/CardDetail';
import {
  loader as CardIndexLoader,
  CardIndexRoute,
} from './routes/Cards/Index';
import Root from './routes/root';
import {
  loader as UserCollectionLoader,
  UserCollection,
} from './routes/Users/UserCollection';
import {
  loader as UserProfileLoader,
  UserProfile,
} from './routes/Users/UserProfile';

const router = createBrowserRouter([
  {
    children: [
      {
        element: <CardIndexRoute />,
        loader: CardIndexLoader,
        path: '/cards/',
        index: true,
      },
      {
        element: <CardDetailRoute />,
        loader: CardDetailLoader,
        path: '/cards/:cardId',
      },
      {
        loader: UserProfileLoader,
        element: <UserProfile />,
        path: '/users/:userId',
      },
      {
        path: '/users/:userId/collection',
        loader: UserCollectionLoader,
        element: <UserCollection />,
      },
    ],
    element: <Root />,
    path: '/',
  },
]);

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ColorSchemeScript defaultColorScheme='auto' />
      <MantineProvider defaultColorScheme='auto'>
        <RouterProvider router={router} />
      </MantineProvider>
    </StrictMode>
  );
}
