import Router from "./Router.js";

export default (routes) => {
  const router = new Router(routes, document.getElementById("root"));

  document.addEventListener("DOMContentLoaded", (e) => {
    document.querySelectorAll("[path]").forEach((path) =>
      path.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          router.navigate(e.target.getAttribute("path"));
        },
        false
      )
    );
  });

  window.addEventListener("hashchange", (e) =>
    router.navigate(e.target.location.hash.substr(1))
  );
};
