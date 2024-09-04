import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import WilderKindCard from "components/card/WilderKindCard.tsx";
import UserProfile from "components/user/UserProfile.tsx";
import Layout_Root from "routes/_layouts/layout_root.tsx";
import Route__Cards from "routes/cards/cards__index.tsx";
import Route__Dashboard from "routes/dashboard/dashboard__index.tsx";
import Route__Login from "routes/login/login__index.tsx";
import Route__Root from "routes/Route__Root.tsx";
import Route__Search from "routes/search/search__index.tsx";
import Route__Users from "routes/users/users__index.tsx";

import routeSearchLoader from "./search/search__index.loader.ts";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout_Root />} path="/">
        <Route element={<Route__Root />} index></Route>
        <Route element={<Route__Login />} path="login"></Route>
        <Route element={<Route__Dashboard />} path="dashboard"></Route>
        /* /users */
        <Route path="users">
          <Route element={<Route__Users />} index></Route>
          <Route element={<UserProfile />} path=":userId">
            {/*<Route path="collection">*/}
            {/*  <Route element={<CardCollection />} index></Route>*/}
            {/*</Route>*/}
          </Route>
        </Route>
        /* /cards */
        <Route path="cards">
          <Route element={<Route__Cards />} index></Route>
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
              return routeSearchLoader(searchTerm);
            }}
            element={<Route__Search />}
            index
          ></Route>
        </Route>
      </Route>,
    ),
  );
