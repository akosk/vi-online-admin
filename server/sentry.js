import raven from 'raven';
const client = new raven.Client('https://d69274ef350f454682f3a306023697bc:bb58ca8a53c84ebca61c978b183d304f@sentry.io/103543');
client.patchGlobal();

const onError = (err, req, res, next) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
}

export const attachRaven = (app)=> {
  app.use(raven.middleware.express.requestHandler('https://d69274ef350f454682f3a306023697bc:bb58ca8a53c84ebca61c978b183d304f@sentry.io/103543'));
  app.use(raven.middleware.express.errorHandler('https://d69274ef350f454682f3a306023697bc:bb58ca8a53c84ebca61c978b183d304f@sentry.io/103543'));
  app.use(onError);
};
