export default class RequestError extends Error {
  constructor(message: string) {
    super();
    this.name = 'RequestError';
    this.message = message;
  }
}
