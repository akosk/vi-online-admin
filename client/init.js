import Raven from 'raven-js';

console.debug('Init...');

if (window.Promise) {
  console.debug(`This browser provides a native Promise. I'm disabling it to force use of core-js to allow "onunhandledrejection".`);
  delete window.Promise;
}

window.onunhandledrejection = e => {
  console.warn('Unhandled Promise Rejection', e.reason);
  Raven.captureException(e.reason, {
    extra: { unhandledPromise: true }
  });
};
