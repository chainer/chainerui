export default class ApiError<R = any> extends Error {
  status: number;

  statusText: string;

  response: R;

  constructor(status: number, statusText: string, response: R) {
    super();
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.response = response;
    this.message = `${status} - ${statusText}`;
  }
}
