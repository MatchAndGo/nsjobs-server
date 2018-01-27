const winston = require('winston');

// .---------------- minute (0 - 59)
// |  .------------- hour (0 - 23)
// |  |  .---------- day of month (1 - 31)
// |  |  |  .------- month (1 - 12)
// |  |  |  |  .----- day of week (0 - 6) (Sunday=0 or 7)
// |  |  |  |  |
// *  *  *  *  *

module.exports = {
  cronTime: '0 */4 * * *', /* Every 4 hours */
  onComplete: () => {
    winston.info('cronjob:default:completed');
  },
  runOnInit: false,
  start: true,
  timeZone: 'Europe/Madrid',
};
