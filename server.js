/* eslint no-console: 0 */
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import config from './webpack.config.dev';
import app from './server/routes/Index.js';
import hatiConfig from './config/config';

const port = hatiConfig.port;
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  // console.log(`App listening on port ${port}...`);
  open(`http://localhost:${port}`);
});
