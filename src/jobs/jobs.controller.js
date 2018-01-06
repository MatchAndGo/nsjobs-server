const winston = require('winston');
const persistence = require('./jobs.persistence');

/**
 * Add a new job into the system if not exists.
 *
 * @param {object} offer
 */
async function postJob(offer) {
  winston.debug('jobs-controller:postJob', offer);
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
async function vote(offerId, uid, type) {
  winston.debug('jobs-controller:postJob', { offerId, uid, type });
  await persistence.vote(offerId, uid, type);
  return persistence.getOfferById(offerId);
}

module.exports = { vote, postJob };