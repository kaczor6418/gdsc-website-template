export class CouldNotParseStringToHTMLElementError extends Error {
  constructor(msg: string) {
    super(`Could not parse string to HTML Element: ${msg}`);
    this.name = CouldNotParseStringToHTMLElementError.name;
  }
}
