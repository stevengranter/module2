import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// @mantine imports
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import {
  CardDetailRoute,
  loader as CardDetailLoader,
} from './routes/Cards/CardDetail';
import {
  CardIndexRoute,
  loader as CardIndexLoader,
} from './routes/Cards/Index';
import {
  UserProfile,
  loader as UserProfileLoader,
} from './routes/Users/UserProfile';
import {
  UserCollection,
  loader as UserCollectionLoader,
} from './routes/Users/UserCollection';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/cards/',
        index: true,
        element: <CardIndexRoute />,
        loader: CardIndexLoader,
      },
      {
        path: '/cards/:cardId',
        element: <CardDetailRoute />,
        loader: CardDetailLoader,
      },
      {
        path: '/users/:userId',
        element: <UserProfile />,
        loader: UserProfileLoader,
      },
      {
        path: '/users/:userId/collection',
        element: <UserCollection />,
        loader: UserCollectionLoader,
      },
    ],
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
