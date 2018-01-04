const Logger = require('../utils/logger');
const config = require('../config');
const controller = require('./jobs.controller');
const slackService = require('../slack/slack.service');
const jobService = require('./jobs.service');

/**
 * Create a new job offer.
 * If the job already exists in the database, just broadcast to the channel
 */
async function post(req, res) {
  try {
    const offer = jobService.createJob(req.body);
    Logger.log('Jobs:routes:post', { offer });
    await controller.postJob(offer);
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
    const offerLink = jobService.getLink(payload.original_message.attachments[0].fallback);
    const offerId = jobService.hash(offerLink);

    Logger.log('Slack:routes:vote', { offerId, uid, type });

    await controller.vote(offerId, uid, type);
    // TODO: Get votes from database to prevent race condition
    const updatedMessage = slackService.updateMessage(payload.original_message, type);
    res.status(200).send(updatedMessage);
  } catch (error) {
    Logger.error('Slack:routes:vote', { error });
    return res.sendStatus(500);
  }
}


module.exports = { post, vote };
