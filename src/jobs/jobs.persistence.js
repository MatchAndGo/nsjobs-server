const firebase = require('firebase');
const Logger = require('../utils/logger');
const JOBS_DATABASE = require('../config/index').JOBS_DATABASE;
const FIREBASE_URL = require('../config/index').FIREBASE_URL;
const FirebaseApp = firebase.initializeApp({ databaseURL: FIREBASE_URL }); // eslint-disable-line
const FirebaseDatabase = firebase.database();
const ref = FirebaseDatabase.ref(JOBS_DATABASE);

/**
 * Store a job offer in the database.
 * @param {*} offer
 */
function saveOffer(offer) {
  Logger.log('Jobs:persistence:saveOffer', { offer });
  return ref
    .child(offer.id)
    .set(offer);
}

/**
 * Get a job offer from the database.
 * @param {*} offer
 */
function getOffer(offer) {
  Logger.log('Jobs:persistence:getOffer', { offer });
  return getOfferById(offer.id);
}

/**
 * Get a job offer from the database.
 * @param {string} id
 */
function getOfferById(id) {
  Logger.log('Jobs:persistence:getOfferById', { id });
  return ref
    .child(id)
    .once('value')
    .then(snapshot => snapshot.val());
}


/**
 * Add a new vote to an existing offer.
 * 
 * The votes are indexed by userID this way we prevent an user from voting twice.
 */
function vote(jobId, uid, type) {
  Logger.log('Jobs:persistence:vote', { jobId, uid, type });
  return ref.child(jobId)
    .child('votes')
    .child(uid)
    .set(type);
}


module.exports = { saveOffer, getOffer, vote, getOfferById };
