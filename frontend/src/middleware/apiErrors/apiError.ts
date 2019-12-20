export default class ApiError<T = any> extends Error {
  name: 'ApiError';

  status: number;

  statusText: string;

  response: T;

  message: string;

  constructor(status: number, statusText: string, response: T) {
    super();
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.response = response;
    this.message = `${status} - ${statusText}`;
  }
}
