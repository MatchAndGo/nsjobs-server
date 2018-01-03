const fetch = require('node-fetch');
const SlackMessage = require('./SlackMessage');
const Logger = require('../utils/logger');

/**
 * Send a job offer to a slack channel
 */
async function broadcast(offer, slackUrl) {
  Logger.log('slackService:broadcast', { offer, slackUrl });
  const method = 'POST';
  const slackMessage = new SlackMessage(offer);
  const body = JSON.stringify(slackMessage.content);
  return fetch(slackUrl, {method, body});
}


module.exports = { broadcast };