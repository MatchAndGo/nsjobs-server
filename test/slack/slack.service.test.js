const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);
// Mock fetch before load service
const slackService = require('../../src/slack/slack.service');
const mockOffer = require('../mocks').offer;
// Test the message format in https://api.slack.com/docs/messages/builder
const expected = require('./slack-message.json');


describe('slack.service', () => {
  describe('.broadcast', () => {
    it('should send a job offer through a slack channel', done => {
      expect(fetch).not.toHaveBeenCalled();
      slackService.broadcast(mockOffer, 'https://www.slack-url.com').then(() => {
        expect(fetch.mock.calls[0][0]).toEqual('https://www.slack-url.com');
        expect(fetch.mock.calls[0][1].method).toEqual('POST');
        expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual(expected);
        done();
      });
    });
  });
});
