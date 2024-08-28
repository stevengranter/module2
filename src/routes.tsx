import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import { EnrichedCardType } from "models/EnrichedCardType";
import { loader as cardsIndexLoader } from "routes/cards/cards__index.loader.tsx";
import { CardsIndexRoute } from "routes/cards/cards__index.tsx";
import { loader as cardIdLoader } from "routes/cards/cards_cardid_index.loader.tsx";
import { CardIdRoute } from "routes/cards/cards_cardid_index.tsx";
import HomePage from "routes/root__index.tsx";
import Root from "routes/rootLayout.tsx";
import search__indexLoader from "routes/search/search__index.loader.ts";
import SearchIndex from "routes/search/search__index.tsx";
import UsersIndexRoute from "routes/users/users__index.tsx";
import { UserProfile } from "routes/users/users_userid__index.tsx";
import { userCollectionLoader } from "routes/users/users_userid_collection_index.loader.tsx";
import { UserCollection } from "routes/users/users_userid_collection_index.tsx";
import { JSON_SERVER_URL } from "utils/constants";
import { fetchData } from "utils/fetchData";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />} path="/">
        <Route element={<HomePage />} index></Route>
        /* /users */
        <Route path="users">
          <Route
            loader={() => fetchData(JSON_SERVER_URL + "/users")}
            element={<UsersIndexRoute />}
            index
          ></Route>
          <Route
            loader={({ params }) =>
              fetchData(JSON_SERVER_URL + "/users?id=" + params.userId)
            }
            element={<UserProfile />}
            path=":userId"
          >
            /* /users/:userId */
            <Route path="collection">
              <Route
                loader={({ params }): Promise<EnrichedCardType[]> =>
                  userCollectionLoader(params.userId)
                }
                element={<UserCollection />}
                index
              ></Route>
            </Route>
          </Route>
        </Route>
        /* /cards */
        <Route path="cards">
          <Route
            element={<CardsIndexRoute />}
            loader={cardsIndexLoader}
            index
          ></Route>
          /* /cards/:cardId */
          <Route path=":cardId">
            <Route
              loader={({ params }) => {
                return cardIdLoader(params.cardId);
              }}
              element={<CardIdRoute />}
              index
            ></Route>
          </Route>
        </Route>
        <Route path="search">
          <Route
            loader={({ request }) => {
              const url = new URL(request.url);
              const searchTerm: string | null = url.searchParams.get("q");
              return search__indexLoader(searchTerm);
            }}
            element={<SearchIndex />}
            index
          ></Route>
        </Route>
      </Route>,
    ),
  );
