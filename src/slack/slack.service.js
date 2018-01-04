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
  return fetch(slackUrl, { method, body });
}

/**
 * Update a slack message with the new votes.
 */
function updateMessage(message, vote) {
  let upvotes = message.attachments[0].actions[0].text.match(/\d+/)[0];
  let downvotes = message.attachments[0].actions[1].text.match(/\d+/)[0];

  switch (vote) {
    case 'upvote':
      message.attachments[0].actions[0].text = `${++upvotes} 👍`;
      break;
    case 'downvote':
      message.attachments[0].actions[1].text = `${++downvotes} 👎`;
      break;
  }
  return message;
}



module.exports = { broadcast, updateMessage };