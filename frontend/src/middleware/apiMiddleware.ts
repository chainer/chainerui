import { Middleware } from 'redux';
import ApiError from './apiErrors/apiError';
import RequestError from './apiErrors/requestError';

export const RSAA = '@@chainerui/RSAA';

export interface RSAACall {
  endpoint: string;
  method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
  types: [RSAARequestType, RSAASuccessType, RSAAFailureType];
  body?: BodyInit | null;
}

export interface RSAAAction {
  [RSAA]: RSAACall;
}

type Payload = any;

type Meta = RSAACall & {
  httpRequest: {
    url: string;
    requesting: boolean;
  };
};

export interface RSAARequestAction {
  type: string;
  payload?: Payload;
  meta?: Meta;
}
export interface RSAASuccessAction {
  type: string;
  payload?: Payload;
  meta?: Meta;
}
export interface RSAAFailureAction {
  type: string;
  payload?: Payload;
  meta?: Meta;
}

export type RSAARequestType = string;
export type RSAASuccessType = string;
export type RSAAFailureType = string;

export type RSAAActions = RSAARequestAction | RSAASuccessAction | RSAAFailureAction;

const isPlainObject = (obj: any): boolean =>
  obj && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype;

const isRSAA = (action: any): action is RSAAAction =>
  isPlainObject(action) && Object.prototype.hasOwnProperty.call(action, RSAA);

const getJSON = async (res: Response): Promise<any | void> => {
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

const normalizeActions = (
  types: [RSAARequestType, RSAASuccessType, RSAAFailureType],
  callAPI: RSAACall
): [RSAARequestAction, RSAASuccessAction, RSAAFailureAction] => {
  const [requestType, successType, failureType] = types;
  const url = getUrl(callAPI.endpoint);

  const requestAction = {
    type: requestType,
    meta: { ...callAPI, httpRequest: { url, requesting: true } },
  };
  const successAction = {
    type: successType,
    meta: { ...callAPI, httpRequest: { url, requesting: false } },
  };
  const failureAction = {
    type: failureType,
    meta: { ...callAPI, httpRequest: { url, requesting: false } },
    error: true,
  };
  return [requestAction, successAction, failureAction];
};

// TODO: use RootState type
export const apiMiddleware: Middleware = (store) => (next) => (action): any => {
  if (!isRSAA(action)) {
    return next(action);
  }

  const callAPI = action[RSAA];
  const { endpoint, method, types, body } = callAPI;

  const url = getUrl(endpoint);

  // Cancel HTTP request if there is already one pending for this URL
  const { requests } = store.getState();
  if (requests[url]) {
    // There is a request for this URL in flight already!
    // (Ignore the action)
    return undefined;
  }

  const [requestAction, successAction, failureAction] = normalizeActions(types, callAPI);

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
      return next({
        ...failureAction,
        payload: new RequestError(e.message),
      });
    }

    const json = await getJSON(res);

    const isOk = res.ok;
    if (!isOk) {
      return next({
        ...failureAction,
        payload: new ApiError(res.status, res.statusText, json),
      });
    }

    return next({
      ...successAction,
      payload: json,
    });
  })();
};
