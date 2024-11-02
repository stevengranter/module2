import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { WildCard } from "~/components/card/WildCard.tsx";
import SampleNest from "~/components/samples/SampleNest.tsx";
import SampleStandardCardPage from "~/components/samples/SampleStandardCardPage.tsx";
import Route__LocalUsers from "~/features/localUser";
import routeSearchLoader from "~/features/search/search__index.loader.ts";
import Route__Search from "~/features/search/search__index.tsx";
import UserManagement from "~/features/userManagement/UserManagement.tsx";
import DefaultLayout from "DefaultLayout.tsx";

import Route__Cards from "components/card/_route_cards.tsx";
import Route__Dashboard from "components/dashboard/dashboard__index.tsx";
import HomePage from "components/homepage/HomePage.tsx";
import UserProfile from "components/user/UserProfile.tsx";

import UserLogin from "./components/form/UserLogin.tsx";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(
    createRoutesFromElements(
      <Route element={<DefaultLayout />} path="/">
        <Route element={<HomePage />} index></Route>
        <Route element={<Route__Dashboard />} path="dashboard"></Route>
        <Route element={<UserLogin />} path="login"></Route>
        /* /users */
        <Route path="users">
          <Route element={<UserManagement />} index></Route>
          <Route element={<UserProfile />} path=":userId">
            {/*<Route path="collection">*/}
            {/*  <Route element={<CardCollection />} index></Route>*/}
            {/*</Route>*/}
          </Route>
        </Route>
        <Route path="local-users">
          <Route element={<Route__LocalUsers />} index></Route>
        </Route>
        /* /cards */
        <Route path="cards">
          <Route element={<Route__Cards />} index></Route>
          /* /cards/:cardId */
          <Route path=":cardId">
            <Route element={<WildCard />} index></Route>
          </Route>
        </Route>
        <Route path="search">
          <Route
            // loader={({ request }) => {
            //   const url = new URL(request.url);
            //   const searchTerm: string | null = url.searchParams.get("q");
            //   console.log(`Search params: ${searchTerm}`);
            //   return routeSearchLoader(searchTerm);
            // }}
            element={<Route__Search />}
            index
          ></Route>
        </Route>
        <Route path="sample" element={<SampleStandardCardPage />} />
      </Route>,
    ),
  );
