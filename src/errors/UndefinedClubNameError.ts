export class UndefinedClubNameError extends Error {
  constructor() {
    super('CLub name has to be defined inside the config.json');
    this.name = UndefinedClubNameError.name;
  }
}
