const crypto = require('crypto');
const firebase = require('firebase');
const FIREBASE_URL = require('../config/index').FIREBASE_URL;
const JOBS_DATABASE = require('../config/index').JOBS_DATABASE;

// Function used to create an unique id
const hash = data => crypto.createHash('md5').update(data).digest("hex");

const FirebaseApp = firebase.initializeApp({ databaseURL: FIREBASE_URL });
const FirebaseDatabase = firebase.database();
const ref = FirebaseDatabase.ref(JOBS_DATABASE);

const Persistence = {};

/**
 * Store a job offer in the database.
 * @param {*} offer
 */
Persistence.saveOffer = function (offer) {
  return ref.child(hash(offer.link)).set(offer);
}

/**
 * Get a job offer from the database.
 * @param {*} offer
 */
Persistence.getOffer = function (offer) {
  return ref.child(hash(offer.link)).once('value');
}

/**
 * Get all job offers from the database.
 * @param {*} params - The request params
 */
Persistence.getJobs = function (params) {
  return ref.once('value').then(data => (
    new Promise((resolve, reject) => {
      const jobs = data.val();
      const jobList = Object.keys(jobs).map(id => Object.assign({ id }, jobs[id]));
      resolve(jobList)
    })
  ));
}

/**
 * Add a new vote to an existing offer
 * @param {*} offer
 */
Persistence.vote = function (type, offer) {
  const vote = `${offer.meta.user_id}/${offer.meta.team_id}`;
  return ref.child(hash(offer.link))
    .child('votes')
    .child(type)
    .push(vote);
}


module.exports = Persistence;
