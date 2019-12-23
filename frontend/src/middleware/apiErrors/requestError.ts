export default class RequestError extends Error {
  name: 'RequestError';

  message: string;

  constructor(message: string) {
    super();
    this.name = 'RequestError';
    this.message = message;
  }
}
