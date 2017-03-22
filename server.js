/* eslint no-console: 0 */
require('dotenv').config({ silent: true });
const app = require('./server/routes/index');

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
  if (error) {
    console.log('error');
  }
  console.log(`App listening on port ${port}...`);
});
