const fetch = require('node-fetch');
const config = require('../config');

const persistence = require('./jobs.persistence');
const SlackMessage = require('../slack/SlackMessage');

const Controller = {};

/**
 * Add a new job to the system.
 *
 * @param {object} offer
 * @param {string} offer.text - The url where the offer is announced.
 */
Controller.postJob = function (offer) {
  return persistence.saveOffer(offer);
}

/**
 * Get a job offer from the system
 *
 * @param {object} offer
 * @param {string} offer.text - The url where the offer is announced.
 */
Controller.getJob = function (offer) {
  return persistence.getOffer(offer);
}

/**
 * Returns all the job offers
 *
 * @param {object} params - The request params
 */
Controller.getJobs = function (params) {
  return persistence.getJobs(params);
}

/**
 * Check first if the job offer already exists.
 * If so, broadcast it.
 * Otherwise, add it first to the database and then broadcast it.
 *
 * @param {object} offer
 */
Controller.broadcast = function (offer) {
  return this.getJob(offer)
    .then((dataSnapshot) => {
      const existingOffer = dataSnapshot.val();

      return existingOffer
        ? this.broadcastSlack(existingOffer)
        : this.postJob(offer).then(() => this.broadcastSlack(offer));
    });
}

/**
 * Add a new vote to an offer
 *
 * @param {object} offer
 */
Controller.vote = function (type, offer, uid) {
  return persistence.vote(type, offer, uid);
}

/**
 * Get a job offer from the system
 *
 * @param {object} offer
 */
Controller.broadcastSlack = function (offer) {
  const slackMessage = new SlackMessage(offer);
  return slackMessage.broadcast();
}

module.exports = Controller;
