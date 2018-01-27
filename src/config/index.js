module.exports = {
  // -- Environment names
  ENV: {
    PRODUCTION: 'production',
    STAGING: 'staging',
    DEVELOPMENT: 'development',
  },

  // -- Slack config
  SLACK_BOT_URL: process.env.SLACK_BOT_URL,

  // -- Telegram config
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,

  // -- Firebase config
  DATABASE_NAME: process.env.DATABASE_NAME,
  FIREBASE_URL: process.env.FIREBASE_URL,

  // -- CORS
  ALLOWED_ORIGINS: [
    'http://localhost:8080',
    'https://nsjobs-f8648.firebaseapp.com',
  ],
};
