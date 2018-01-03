const Logger = require('../utils/logger');
const config = require('../config');
const controller = require('./jobs.controller');
const Offer = require('./Offer');
const slackService = require('../slack/slack.service');

/**
 * Create a new job offer.
 * If the job already exists in the database, just broadcast to the channel
 */
async function post(req, res) {
  try {
    const offer = _buildOffer(req.body);
    Logger.log('Jobs:routes:post', { offer });
    await controller.post(offer);
    await slackService.broadcast(offer, config.SLACK_BOT_URL);
    res.status(201).send('Offer created');
  } catch (error) {
    Logger.error('Jobs:routes:post', { error });
    return res.sendStatus(500);
  }
}

/**
 * Vote an existing job offer.
 */
async function vote(req, res) {
  try {
    const payload = JSON.parse(req.body.payload);
    const action = payload.actions[0];
    const type = action.value.toLowerCase();
    const uid = `${payload.team.id}-${payload.user.id}`;
    // TODO: can we get the id easier?
    const offerLink = Offer.getLink(payload.original_message.attachments[0].fallback);
    const offerId = Offer.hash(offerLink);

    Logger.log('Slack:routes:vote', { offerId, uid, type });

    await controller.vote(offerId, uid, type);
    res.status(200).send(payload.original_message); // TODO, send message with new vote count
  } catch (error) {
    Logger.error('Slack:routes:vote', { error });
    return res.sendStatus(500);
  }
}


/**
 * Build an offer object from a http request.
 * @param {object} query
 */
function _buildOffer(query) {
  Logger.log('Jobs:routes:_buildOffer', { query });
  return new Offer(query);
}


module.exports = { post, vote };
