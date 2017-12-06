/**
 *
 * This file contains express routes in form of functions (req, res) => any.
 * This way we can keep the bussines logic {@link jobs.controller } away from the
 * framework.
 *
 * @namespace {jobs.routes}
 */

const controller = require('./jobs.controller');
const Offer = require('./Offer');

/**
 * Request handler for posting a new job offer.
 * @param {*} req
 * @param {*} res
 */
async function postJob(req, res) {
    try {
        const offer = _buildOffer(req.body);
        await controller.postJob(offer)
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

/**
 * Build an offer object from a http request.
 * @param {object} query
 */
function _buildOffer(query) {
    return new Offer(query);
}


module.exports = { postJob };
