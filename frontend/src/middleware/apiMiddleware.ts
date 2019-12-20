import { Middleware } from 'redux';
import ApiError from './apiErrors/apiError';
import RequestError from './apiErrors/requestError';

export const RSAA = '@@chainerui/RSAA';

export interface RSAACall<State = any, Payload = any, Meta = any> {
  endpoint: string;
  method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
  types: [RSAARequestType, RSAASuccessType, RSAAFailureType];
  body?: BodyInit | null;
}

export interface RSAAAction<State = any, Payload = any, Meta = any> {
  [RSAA]: RSAACall<State, Payload, Meta>;
}

export interface RSAARequestTypeDescriptor<State = any, Payload = any, Meta = any> {
  type: string;
  payload?: ((action: RSAAAction, state: State, res: Response) => Payload) | Payload;
  meta?: Meta;
}
export interface RSAASuccessTypeDescriptor<State = any, Payload = any, Meta = any> {
  type: string;
  payload?: ((action: RSAAAction, state: State, res: Response) => Payload) | Payload;
  meta?: Meta;
}
export interface RSAAFailureTypeDescriptor<State = any, Payload = any, Meta = any> {
  type: string;
  payload?: ((action: RSAAAction, state: State, res: Response) => Payload) | Payload;
  meta?: Meta;
}

export type RSAARequestType = string;
export type RSAASuccessType = string;
export type RSAAFailureType = string;

const isPlainObject = (obj: any): boolean =>
  obj && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;

const isRSAA = <State = any, Payload = any, Meta = any>(
  action: any
): action is RSAAAction<State, Payload, Meta> =>
  isPlainObject(action) && Object.prototype.hasOwnProperty.call(action, RSAA);

const getJSON = async (res: Response): Promise<any> => {
  const contentType = res.headers.get('Content-Type');
  const emptyCodes = [204, 205];

  if (emptyCodes.indexOf(res.status) === -1 && contentType && contentType.indexOf('json') !== -1) {
    return res.json();
  }
  return Promise.resolve();
};

const API_ROOT = '/api/v1/';

const getUrl = (endpoint: string): string =>
  endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

export const apiMiddleware: Middleware = (store) => (next) => (action): any => {
  if (!isRSAA(action)) {
    return next(action);
  }

  const callAPI = action[RSAA];
  const { endpoint, method, types, body } = callAPI;
  const [requestType, successType, failureType] = types;

  const url = getUrl(endpoint);

  // Cancel HTTP request if there is already one pending for this URL
  const { requests } = store.getState();
  if (requests[url]) {
    // There is a request for this URL in flight already!
    // (Ignore the action)
    return undefined;
  }

  const requestAction = {
    type: requestType,
    meta: { ...callAPI, httpRequest: { url, requesting: true } },
  };
  next(requestAction);

  return (async (): Promise<any> => {
    let res;
    try {
      res = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      const failureAction = {
        type: failureType,
        payload: new RequestError(e.message),
        meta: { ...callAPI, httpRequest: { url, requesting: false } },
        error: true,
      };
      return next(failureAction);
    }

    const json = await getJSON(res);

    const isOk = res.ok;
    if (!isOk) {
      const failureAction = {
        type: failureType,
        payload: new ApiError(res.status, res.statusText, json),
        meta: { ...callAPI, httpRequest: { url, requesting: false } },
        error: true,
      };
      return next(failureAction);
    }

    const successAction = {
      type: successType,
      payload: json,
      meta: { ...callAPI, httpRequest: { url, requesting: false } },
    };
    return next(successAction);
  })();
};
