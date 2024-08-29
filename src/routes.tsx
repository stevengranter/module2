import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import { loader as cardsIndexLoader } from "routes/cards/cards__index.loader.tsx";
import { CardsIndexRoute } from "routes/cards/cards__index.tsx";
import { loader as cardIdLoader } from "routes/cards/cards_cardid_index.loader.tsx";
import { CardIdRoute } from "routes/cards/cards_cardid_index.tsx";
import HomePage from "routes/root__index.tsx";
import Root from "routes/rootLayout.tsx";
import search__indexLoader from "routes/search/search__index.loader.ts";
import SearchIndex from "routes/search/search__index.tsx";

import UserList from "./components/user/UserList.tsx";
import UserProfile from "./components/user/UserProfile.tsx";
import { UserCollection } from "./routes/users/users_userid_collection_index.tsx";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />} path="/">
        <Route element={<HomePage />} index></Route>
        /* /users */
        <Route path="users">
          <Route element={<UserList />} index></Route>
          <Route element={<UserProfile />} path=":userId">
            <Route path="collection">
              <Route element={<UserCollection />} index></Route>
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
