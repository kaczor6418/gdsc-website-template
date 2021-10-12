export class RoutingService {
  routes;
  currentRoute;

  constructor(routes) {
    this.routes = routes;
    this.listenOnRoutChanges();
  }

  listenOnRoutChanges() {
    document.addEventListener('DOMContentLoaded', () => {
      debugger;
    });
  }

  setPath(path) {
    this.currentRoute = path;
    const componentToRender = this.routes[path];
  }
}