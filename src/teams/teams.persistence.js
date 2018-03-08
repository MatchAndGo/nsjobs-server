const winston = require('winston');
const { ref } = require('../config/firebase');

/**
 * Store team credentials in the database.
 * @param {*} team
 */
function saveTeam(credentials) {
  winston.info('teams-persistence:saveTeam', credentials);
  return ref
    .child('teams')
    .child(credentials.team_id)
    .set(credentials);
}

/**
 * Get team by id
 * @param {*} teamId
 */
function getTeamById(teamId) {
  winston.info('teams-persistence:getTeamById', teamId);
  return ref
    .child('teams')
    .child(teamId)
    .once('value')
    .then(snapshot => snapshot.val());
}

module.exports = { saveTeam, getTeamById };
