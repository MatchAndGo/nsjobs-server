const TeleBot = require('telebot');
const winston = require('winston');
const config = require('../config');

const { NODE_ENV } = process.env;
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, ENV: { PRODUCTION } } = config;
let bot;

module.exports = function (message) {
  if (NODE_ENV === PRODUCTION) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

    if (!bot) {
      bot = new TeleBot(TELEGRAM_BOT_TOKEN);
      bot.connect();
    }

    // TODO: Handle errors?
    bot.sendMessage(TELEGRAM_CHAT_ID, message, { parseMode: 'html', webPreview: false });
  } else {
    winston.info('services:telegram', message);
  }
};
