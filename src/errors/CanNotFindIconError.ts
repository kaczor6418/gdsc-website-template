export class CouldNotFetchConfigError extends Error {
  constructor(iconId: string) {
    super(`Could not fetch icon under given url: ${iconId}`);
    this.name = CouldNotFetchConfigError.name;
  }
}
