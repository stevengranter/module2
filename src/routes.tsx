import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import DefaultLayout from "DefaultLayout.tsx";

import Route__Cards from "components/card/_route_cards.tsx";
import WilderKindCard from "components/card/WilderKindCard.tsx";
import Route__Dashboard from "components/dashboard/dashboard__index.tsx";
import HomePage from "components/homepage/HomePage.tsx";
import Route__Users from "components/user/_route_users.tsx";
import UserProfile from "components/user/UserProfile.tsx";
import Route__Search from "routes/search/search__index.tsx";

import UserLogin from "./components/form/UserLogin.tsx";
import routeSearchLoader from "./routes/search/search__index.loader.ts";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(
    createRoutesFromElements(
      <Route element={<DefaultLayout />} path="/">
        <Route element={<HomePage />} index></Route>
        <Route element={<Route__Dashboard />} path="dashboard"></Route>
        <Route element={<UserLogin />} path="login"></Route>
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
