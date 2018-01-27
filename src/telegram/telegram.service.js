const TelegramBot = require('./TelegramBot');
const winston = require('winston');

/**
 * Send a message using Telegram
 * @param {string} message
 */
function broadcast(message) {
  winston.info('telegram-service:broadcast');

  TelegramBot(message);
}

module.exports = { broadcast };
