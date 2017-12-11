const bodyParser = require('body-parser');
const app = require('express')();
const fetch = require('node-fetch');
const cors = require('cors');
const jobsRoutes = require('./src/jobs/jobs.routes');
const slackRoutes = require('./src/slack/slack.routes');

const PORT = process.env.PORT || 3000;

// -- Setup express
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
  origin: '*', // TODO: Change this <3
}));

// -- Routes
app.get('/jobs', jobsRoutes.getAll);
app.post('/jobs', jobsRoutes.broadcast);
app.post('/slack', slackRoutes.sendMessage);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
