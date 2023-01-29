import isString from 'lodash/isString';

export function handleError(err: any) {
  if (err?.response?.detail === 'Invalid token.') {
    return;
  }
  if (err?.message === 'Network Error') {
    console.error(err.message, err);
  } else if (err?.response?.error?.message) {
    console.error(err?.response?.error?.message, JSON.stringify(err.response), err);
  } else if (isString(err?.response)) {
    console.error(err.response);
  } else {
    console.error(err);
  }
}
