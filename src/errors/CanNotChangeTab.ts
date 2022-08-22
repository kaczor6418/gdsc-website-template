export class CanNotChangeTab extends Error {
  constructor(msg: string) {
    super(`Could not change tab because ${msg}`);
    this.name = CanNotChangeTab.name;
  }
}
