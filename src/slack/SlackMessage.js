const Logger = require('../utils/logger');
const SlackAttachments = require('./slack.attachments');

class SlackMessage {
  constructor(offer) {
    Logger.log('Class:SlackMessage:constructor', { offer });

    const offerAttachment = Object.assign({}, SlackAttachments.OFFER, {
      author_name: offer.meta.user_name,
      title: offer.meta.text,
      title_link: offer.link
    });

    this.content = {
      attachments: [
        offerAttachment,
        SlackAttachments.VOTE
      ]
    };
  }
}


module.exports = SlackMessage;
