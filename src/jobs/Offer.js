const Logger = require('../utils/logger');
const URL_REGEX = /(?:http|https):\/\/((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/;
const crypto = require('crypto');

class Offer {
  static hash(data) {
    return crypto.createHash('md5').update(data).digest('hex');
  }

  static getLink(string) {
    Logger.log('Class:Offer:_getLink', { string });
    try {
      const link = string.match(URL_REGEX);
      return link[0];
    } catch (err) {
      Logger.error('Class:Offer:_getLink', { string });
      throw new Error(`Job offers must have a link. [${string}]`);
    }
  }

  constructor(query) {
    Logger.log('Class:Offer:constructor', { query });

    this.link = Offer.getLink(query.text);
    this.id = Offer.hash(this.link);
    this.description = this._getDescription(query.text, this.link);
    this.createdAt = Date.now();
    this.text = query.text;
    this.meta = query;
    this.shared = 0;
  }

  _getDescription(rawText, link) {
    Logger.error('Class:Offer:_getDescription', { rawText, link });
    return rawText.replace(link, '').trim();
  }
}

module.exports = Offer;
