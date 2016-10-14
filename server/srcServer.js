/* eslint-disable no-console */
import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import open from 'open';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import {attachRaven} from './sentry';


import router from './router';
import log from './lib/nodelogger';



const port = 4000;
const app = express();
const compiler = webpack(config);

attachRaven(app);

//app.use(morgan('combined'));
app.use(helmet());
app.use(bodyParser.json());
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

router(app);

app.listen(port, function (err) {
  if (err) {
    log.debug("------ERROR------", err);
  } else {
    open(`http://localhost:${port}`);
  }
});

