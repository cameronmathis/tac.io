import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Play from "../pages/Play";

export const LOGIN = {
  path: "/login",
  component: <Login />,
};

export const HOME = {
  path: "/home",
  component: <Home />,
};

export const PLAY = {
  path: "/play",
  component: <Play />,
};

export const PAGE_NOT_FOUND = {
  path: "/pageNotFound",
  component: <PageNotFound />,
};

export const PAGES = [LOGIN, HOME, PLAY, PAGE_NOT_FOUND];
