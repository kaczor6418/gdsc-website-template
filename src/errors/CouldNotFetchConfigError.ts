export class CouldNotFetchConfigError extends Error {
  constructor(e: Error) {
    super(`Could not fetch app config due this error: ${JSON.stringify(e)}`);
    this.name = CouldNotFetchConfigError.name;
  }
}
