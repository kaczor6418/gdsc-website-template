export class CanNotUseSelectionServiceError extends Error {
  constructor() {
    super('Can not use selection service if interactive element is undefined');
    this.name = CanNotUseSelectionServiceError.name;
  }
}
