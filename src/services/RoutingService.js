export class RoutingService {
  config;

  constructor(config) {
    this.config = config;
    this.listenOnRoutChanges();
  }

  listenOnRoutChanges() {
    document.addEventListener('DOMContentLoaded', () => {
      debugger;
    });
  }
}