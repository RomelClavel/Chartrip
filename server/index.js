const Express = require('express');
const app = Express();
const cors = require('cors');
const router = require('./routes/router');
const port = 3001;
const host = 'localhost';

app.use(Express.json());
app.use(cors());

app.use(router);

app.listen(port, () => {
	console.log(`Server running at => http://${host}:${port}`);
});
