/* eslint no-console: 0 */
import dotenv from 'dotenv';
import app from './server/routes/index';

dotenv.config({ silent: true });

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
  if (error) {
    console.log('error');
  }
  console.log(`App listening on port ${port}...`);
});
