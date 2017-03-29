/* eslint no-console: 0 */
require('dotenv').config({ silent: true });
const app = require('./server/routes/Index.js');
const path = require('path');

const port = process.env.PORT || 8080;

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './hati.apib'));
});

app.listen(port, (error) => {
  if (error) {
    console.log('error');
  }
  console.log(`App listening on port ${port}...`);
});
