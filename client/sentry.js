import Raven from "raven-js";

export const sentry_url='https://d69274ef350f454682f3a306023697bc@sentry.io/103543';

export function logException(ex,context) {
  Raven.captureException(ex,{
    extra:context
  });
  window && window.console && console.error && console.error(ex);
}
