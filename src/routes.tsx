import { createBrowserRouter } from 'react-router-dom';

import { jsonServerUrl } from 'utils/constants';

import {
  loader as CardDetailLoader,
  CardDetailRoute,
} from './routes/Cards/CardDetail';
import { CardIndexRoute } from './routes/Cards/Index';
import Root from './routes/root';
import {
  loader as UserCollectionLoader,
  UserCollection,
} from './routes/Users/UserCollection';
import {
  loader as UserProfileLoader,
  UserProfile,
} from './routes/Users/UserProfile';
import { fetchData } from './utils/fetchData';

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      children: [
        {
          loader: () => fetchData(jsonServerUrl + '/cards'),
          element: <CardIndexRoute />,
          path: '/cards/',
          index: true,
        },
        {
          loader: async ({ params }) => {
            const cardId = params.cardId;
            return fetchData(jsonServerUrl + '/cards/?id=' + cardId);
          },
          element: <CardDetailRoute />,
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
