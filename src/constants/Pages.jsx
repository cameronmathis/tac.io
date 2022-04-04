import PageNotFound from "../pages/PageNotFound";

import Home from "../pages/Home";
import Login from "../pages/Login";

export const HOME = {
  path: "/home",
  component: <Home />,
};

export const LOGIN = {
  path: "/login",
  component: <Login />,
};

export const PAGE_NOT_FOUND = {
  path: "/pageNotFound",
  component: <PageNotFound />,
};

export const PAGES = [HOME, LOGIN, PAGE_NOT_FOUND];
