export default class Router {
  constructor(routes = [], rootRender) {
    this.routes = routes;
    this.rootRender = rootRender;
    this.navigate(location.pathname + location.hash);
  }

  filterParam(route) {
    let queryName = [];
    let regex = route.path.replace(/([:*])(\w+)/g, (value) => {
      queryName.push(value.replace(":", ""));
      return "([^/]+)";
    });

    return { regex, queryName };
  }

  match(route, requestPath) {
    let queryParam = this.filterParam(route);
    let routeCurrentMatch = requestPath.match(
      new RegExp(queryParam.regex + "(?:/|$)")
    );
    let filterQuery = {};

    if (routeCurrentMatch) {
      filterQuery = routeCurrentMatch.slice(1).reduce((query, value, index) => {
        if (query === null) query = {};

        query[queryParam.queryName[index]] = value;
        return query;
      }, null);
    }

    route.setProps(filterQuery);
    return routeCurrentMatch;
  }

  navigate(path) {
    const page = this.routes.filter((route) => this.match(route, path))[0];
    const page404 = this.routes.filter((route) => route.query === "404")[0];

    !page
      ? this.renderView(page404)
      : this.redirectPathAndRenderView(page, path);
  }

  redirectPathAndRenderView(route, path) {
    window.location.href = path.search("/#") === -1 ? "#" + path : path;
    this.renderView(route);
  }

  renderView(page) {
    this.rootRender.innerHTML = page.renderView();
  }
}
