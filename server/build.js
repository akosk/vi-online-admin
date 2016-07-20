// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';
import log from './lib/nodelogger';

process.env.NODE_ENV = 'production'; // this assures the Babel dev config (for hot reloading) doesn't apply.

log.debug('Generating minified bundle for production via Webpack. This will take a moment...'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    log.debug(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => log.debug(error.red));
  }

  if (jsonStats.hasWarnings) {
    log.debug('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => log.debug(warning.yellow));
  }

  log.debug(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  log.debug('Your app has been compiled in production mode and written to /dist. It\'s ready to roll!'.green);

  return 0;
});
