const Logger = require('../utils/logger');
const SlackAttachments = require('./slack.attachments');

class SlackMessage {
  constructor(offer) {
    Logger.log('Class:SlackMessage:constructor', { offer });

    // Add title and link to the attachment
    SlackAttachments.VOTE.title = offer.link;
    SlackAttachments.VOTE.title_link = offer.link;

    this.content = {
      text: offer.description,
      attachments: [
        SlackAttachments.VOTE
      ]
    };
  }
}


module.exports = SlackMessage;
