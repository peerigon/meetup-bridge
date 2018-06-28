/* eslint-disable import/unambiguous */

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
  'description',
];

function parseBody(res) {
  const data = res.body;

  if (!Array.isArray(data)) {
    console.log(data);
    throw new Error('Received invalid data from the API: Expected an Array.');
  }

  return data.map((event) => pick(event, propsToPick));
}

async function getApiContent(url, options) {
  const content = await got(url, options);

  return content;
}

async function bridge(apiKey) {
  const query = {
    key: encodeURIComponent(apiKey),
    sign: true,
  };
  const url = `${EVENTS_URL}?${qs.stringify(query)}`;
  const options = {
    json: true,
  };
  const content = await getApiContent(url, options);

  return parseBody(content);
}

module.exports = bridge;
