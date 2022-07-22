/* Views */
import Favorites from "Views/Main/Favorites";
import Home from "../Views/Main/Home";

var routes = [
  {
    path: "/",
    display: true,
    name: "Home",
    icon: null,
    iconColor: "Primary",
    component: <Home />,
    layout: "/",
  },
  {
    path: "/favorites",
    display: true,
    name: "Favorites",
    icon: null,
    iconColor: "Primary",
    component: <Favorites />,
    layout: "/",
  },
];
export default routes;
