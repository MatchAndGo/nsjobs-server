const bodyParser = require('body-parser');
const app = require('express')();
const PORT = process.env.PORT || 3000;
const router = require('./src/jobs/jobs.router');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/jobs', router.post);
app.post('/slack', router.vote);

app.listen(PORT);
