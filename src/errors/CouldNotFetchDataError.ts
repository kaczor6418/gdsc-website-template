export class CouldNotFetchDataError extends Error {
  constructor(msg: string) {
    super(`Could not fetch data if: ${msg}`);
    this.name = CouldNotFetchDataError.name;
  }
}
