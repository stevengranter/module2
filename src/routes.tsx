import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import CardsIndexRoute from "routes/cards/cards__index.tsx";
import HomePage from "routes/root__index.tsx";
import Root from "routes/rootLayout.tsx";
import search__indexLoader from "routes/search/search__index.loader.ts";
import SearchIndex from "routes/search/search__index.tsx";

import WilderKindCard from "./components/card/WilderKindCard.tsx";
import UserList from "./components/user/UserList.tsx";
import UserProfile from "./components/user/UserProfile.tsx";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />} path="/">
        <Route element={<HomePage />} index></Route>
        /* /users */
        <Route path="users">
          <Route element={<UserList />} index></Route>
          <Route element={<UserProfile />} path=":userId">
            {/*<Route path="collection">*/}
            {/*  <Route element={<CardCollection />} index></Route>*/}
            {/*</Route>*/}
          </Route>
        </Route>
        /* /cards */
        <Route path="cards">
          <Route element={<CardsIndexRoute />} index></Route>
          /* /cards/:cardId */
          <Route path=":cardId">
            <Route element={<WilderKindCard />} index></Route>
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
