import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import Video from "./pages/Video";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/series/:id/:season",
    exact: true,
    component: MoviePage,
  },
  {
    path: "/series/:id/:season/:episode/",
    exact: true,
    component: Video,
  },
];
