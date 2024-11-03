import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { WildCard } from "~/components/card/WildCard.tsx";
import SampleStandardCardPage from "~/components/samples/SampleStandardCardPage.tsx";
import Route__LocalUsers from "~/features/localUser";
import UserManagement from "~/features/userManagement/UserManagement.tsx";
import Route__Cards from "~/routes/cards__index.tsx";
import Route__Dashboard from "~/routes/dashboard/dashboard__index.tsx";
import HomePage from "~/routes/home/HomePage.tsx";
import Route__Search from "~/routes/search__index.tsx";
import UserProfile from "~/routes/users/UserProfile.tsx";
import DefaultLayout from "DefaultLayout.tsx";

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
