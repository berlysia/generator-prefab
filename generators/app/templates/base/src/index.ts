

export default class Greeter {
  log(...args): void {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
  greet(): string {
    const message = "Hello World";
    this.log(message);
    return message;
  }
}
