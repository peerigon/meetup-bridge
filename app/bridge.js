'use strict';

const got = require('got');
const qs = require('query-string');
const pick = require('lodash.pick');

const EVENTS_URL = 'https://api.meetup.com/nodeschool-augsburg/events';
const propsToPick = [
  'id',
  'time',
  'name',
  'utc_offset',
  'rsvp_limit',
  'yes_rsvp_count',
  'venue',
  'link',
  'description'
];

function parseBody(res) {
  const data = res.body;

  if (!Array.isArray(data)) {
    throw new Error('Received invalid data from the API: Expected an Array.');
  }

  return data.map((event) => pick(event, propsToPick));
}

function bridge(apiKey, cb) {
  const query = {
    key: encodeURIComponent(apiKey),
    sign: true
  };

  const url = `${EVENTS_URL}?${qs.stringify(query)}`;
  const options = {
    json: true
  };

  got(url, options)
    .then(parseBody)
    .then((res) => cb(null, res))
    .catch((err) => cb(err));
}

module.exports = bridge;
