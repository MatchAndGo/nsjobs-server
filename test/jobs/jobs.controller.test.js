const controller = require('../../src/jobs/jobs.controller');
const persistence = require('../../src/jobs/jobs.persistence');
const { offer } = require('../mocks');

describe('jobs.controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('postJob', () => {
    it('should create a new offer when the offer does not exist in the database', done => {
      jest.spyOn(persistence, 'getOffer').mockImplementation(() => Promise.resolve(false));
      jest.spyOn(persistence, 'saveOffer').mockImplementation(() => Promise.resolve());
      expect(persistence.saveOffer).not.toHaveBeenCalled();

      controller.postJob(offer).then(() => {
        expect(persistence.saveOffer).toBeCalledWith(offer);
        done();
      });
    });

    it('should not create a new offer when the offer already exists in the database', done => {
      jest.spyOn(persistence, 'getOffer').mockImplementation(() => Promise.resolve(true));
      jest.spyOn(persistence, 'saveOffer').mockImplementation(() => Promise.resolve());
      expect(persistence.saveOffer).not.toHaveBeenCalled();

      controller.postJob(offer).then(() => {
        expect(persistence.saveOffer).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe('vote', () => {
    it('should update the offer votes in the persistence', done => {
      jest.spyOn(persistence, 'vote').mockImplementation(() => Promise.resolve());
      jest.spyOn(persistence, 'getOfferById').mockImplementation(() => Promise.resolve());
      expect(persistence.vote).not.toHaveBeenCalled();

      controller.vote('fakeId', 'fakeUid', 'fakeType').then(() => {
        expect(persistence.vote).toBeCalledWith('fakeId', 'fakeUid', 'fakeType');
        done();
      });
    });
  });
});
