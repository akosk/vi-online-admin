import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import router from './router';

/*eslint-disable no-console */

const port = 3000;
const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(express.static('dist'));

router(app,'production');

console.log(`Production server. Listening on ${port}...`);
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
});
