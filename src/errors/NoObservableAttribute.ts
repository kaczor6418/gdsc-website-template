export class NoObservableAttribute extends Error {
  constructor(componentName: string, observableAttributes: string[], attribute: string) {
    super(
      `Component ${componentName} supports only these observable attributes: ${observableAttributes.toString()}. Attribute ${attribute} is not supported`
    );
    this.name = NoObservableAttribute.name;
  }
}
