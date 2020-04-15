import router from "./router/index.js";
import Route from "./router/Route.js";

import homeView from "./views/home.js";
import stickersView from "./views/stickers.js";
import page404 from "./views/404.js";

const routes = [
  new Route("home", "/", homeView),
  new Route("stickers", "/stickers", stickersView),
  new Route("404", "/404", page404),
];

router(routes);
