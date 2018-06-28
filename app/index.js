/* eslint-disable import/unambiguous */

require('dotenv-safe').config();

const Hapi = require('hapi');
const bridge = require('./bridge');

const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;
const server = Hapi.server({
  port: PORT || 3001,
});
const MIN = 60 * 1000;

if (!API_KEY) {
  throw new Error('You need to provide an API key!');
}

async function init() {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

// We want caching! Thus we need to wrap it into a server method.
server.method('getEvents', bridge, {
  cache: {
    expiresIn: 60 * MIN,
    generateTimeout: 1000,
    getDecoratedValue: true,
  },
});

server.route({
  method: 'GET',
  path: '/events',
  handler: async (request, h) => {
    const {value, cached} = await server.methods.getEvents(API_KEY);
    const lastModified = cached ? new Date(cached.stored) : new Date();

    return h.response(value).header('Last-modified', lastModified.toUTCString());
  },
  options: {
    cache: {
      expiresIn: 60 * MIN,
      privacy: 'public',
    },
  },
});

process.on('unhandledRejection', (err) => {
  throw (err);
});

init();
