import dotenv from 'dotenv';
import app from './server/routes/index';

dotenv.config({ silent: true });

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
	if (!error) {
		console.log(`App listening on port ${port}...`);
	} else {
		console.log('error');
	}
});
