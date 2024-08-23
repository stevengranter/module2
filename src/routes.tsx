import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom';

import { enrichedCardType } from 'models/enrichedCardType';
import { speciesCardType } from 'models/speciesCardType';
import { CardIdRoute } from 'routes/cards/cardId';
import { cardIdLoader } from 'routes/cards/cardId/indexLoader';
import { CardsIndexRoute } from 'routes/cards/index';
import { cardsIndexLoader } from 'routes/cards/indexLoader.tsx';
import HomePage from 'routes/index.tsx';
import Root from 'routes/rootLayout.tsx';
import { UserCollection } from 'routes/users/collection/index.tsx';
import { userCollectionLoader } from 'routes/users/collection/indexLoader';
import UsersIndexRoute from 'routes/users/index.tsx';
import { UserProfile } from 'routes/users/userId/index.tsx';
import { jsonServerUrl } from 'utils/constants';
import { fetchData } from 'utils/fetchData';

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={<Root />}
        path='/'
      >
        <Route
          element={<HomePage />}
          index
        ></Route>
        <Route path='users'>
          <Route
            loader={() => fetchData(jsonServerUrl + '/users')}
            element={<UsersIndexRoute />}
            index
          ></Route>
          <Route
            loader={({ params }) =>
              fetchData(jsonServerUrl + '/users?id=' + params.userId)
            }
            element={<UserProfile />}
            path=':userId'
          >
            /* /users/:userId */
            <Route path='collection'>
              <Route
                loader={({ params }): Promise<enrichedCardType[]> =>
                  userCollectionLoader(params.userId)
                }
                element={<UserCollection />}
                index
              ></Route>
            </Route>
          </Route>
        </Route>
        /* /cards */
        <Route path='cards'>
          <Route
            element={<CardsIndexRoute />}
            loader={cardsIndexLoader}
            index
          ></Route>
          /* /cards/:cardId */
          <Route path=':cardId'>
            <Route
              loader={({ params }): Promise<speciesCardType> => {
                return cardIdLoader(params.cardId);
              }}
              element={<CardIdRoute />}
              index
            ></Route>
          </Route>
          /* /users */
        </Route>
      </Route>
    )
  );
