import router from "./router/index.js";
import Route from "./router/Route.js";

import homeView from "./views/home.js";
import stickerView from "./views/sticker.js";
import page404 from "./views/404.js";

const routes = [
  new Route("home", "/", homeView),
  new Route("sticker", "/sticker/:id", stickerView),
  new Route("404", "/404", page404),
];

router(routes);
