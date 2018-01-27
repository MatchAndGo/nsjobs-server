const CronJob = require('cron').CronJob;
const defaults = require('./defaults');
const telegramController = require('../telegram/telegram.controller');

const jobs = [
  { cronTime: '0 19 * * * *', onTick: telegramController.sendMostVoted },
];

jobs.forEach(job => new CronJob(Object.assign({}, defaults, job)));
