import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import SampleStandardCardPage from "~/features/_shared/samples/SampleStandardCardPage.tsx";
import { WildCard } from "~/features/card/components/WildCard/WildCard.tsx";
import CardsPage from "~/features/card/pages/CardsPage.tsx";
import DashboardPage from "~/features/dashboard/pages/DashboardPage.tsx";
import HomePage from "~/features/home/pages/HomePage.tsx";
import UserLogin from "~/features/local-user/components/UserLogin.tsx";
import UserProfile from "~/features/local-user/components/UserProfile.tsx";
import Route__LocalUsers from "~/features/local-user/pages";
import SearchPage from "~/features/search/pages/SearchPage.tsx";
import UserManagement from "~/features/user-management/components/UserManagement.tsx";
import DefaultLayout from "~/theme/DefaultLayout.tsx";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(
    createRoutesFromElements(
      <Route element={<DefaultLayout />} path="/">
        <Route element={<HomePage />} index></Route>
        <Route element={<DashboardPage />} path="dashboard"></Route>
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
          <Route element={<CardsPage />} index></Route>
          /* /cards/:cardId */
          <Route path=":cardId">
            <Route element={<WildCard />} index></Route>
          </Route>
        </Route>
        <Route path="search">
          <Route element={<SearchPage />} index></Route>
        </Route>
        <Route path="sample" element={<SampleStandardCardPage />} />
      </Route>,
    ),
  );
