const Logger = require('../utils/logger');
const persistence = require('./jobs.persistence');

/**
 * Add a new job into the system if not exists.
 *
 * @param {object} offer
 */
async function postJob(offer) {
  Logger.log('Jobs:controller:postJob', { offer });
  const existingOffer = await persistence.getOffer(offer);
  if (!existingOffer) {
    return persistence.saveOffer(offer);
  }
  return Promise.resolve();
}

/**
 * Add a new vote to an offer
 *
 * @param {object} offer
 */
function vote(jobId, uid, type) {
  Logger.log('Jobs:controller:vote', { jobId, uid, type });
  return persistence.vote(jobId, uid, type);
}

module.exports = { vote, postJob };