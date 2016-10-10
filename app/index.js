'use strict';

require('dotenv').config({ silent: true });

const Hapi = require('hapi');
const bridge = require('./bridge');

const server = new Hapi.Server();
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;
const MIN = 60 * 1000;

if (!API_KEY) {
  throw new Error('You need to provide an API key!');
}

server.connection({
  port: PORT || 3001
});

// We want caching! Thus we need to wrap it into a server method.
server.method('getEvents', bridge, {
  cache: {
    expiresIn: 60 * MIN,
    generateTimeout: 1000
  }
});

server.route({
  method: 'GET',
  path: '/events',
  handler(request, reply) {
    function cb(err, res, cached) {
      const lastModified = cached ? new Date(cached.stored) : new Date();

      reply(err || res).header('last-modified', lastModified.toUTCString());
    }

    server.methods.getEvents(API_KEY, cb);
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`🔧 Running at ${server.info.uri}`);
});
