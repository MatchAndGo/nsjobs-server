const jobsPersistence = require('../jobs/jobs.persistence');
const service = require('./telegram.service');
const winston = require('winston');

/**
 * List all jobs in the database.
 */
async function sendMostVoted() {
  winston.info('telegram-controller:sendMostVoted');

  const jobs = await jobsPersistence.getAll();
  const message = jobs.map(_createFormattedJob).join('\n\n');

  service.broadcast(message);
}

/**
 * Transform an job from the database to a public object availiable in the API.
 * @param {*} job
 */
function _createFormattedJob(job) {
  return `<a href="${job.link}">${job.description}</a>\nby ${job.meta.user_name}`;
}

module.exports = { sendMostVoted };
