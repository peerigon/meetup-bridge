# meetup-bridge
Bridging the meetup API to show events on our webpage - https://peerigon.com

[![Build Status](https://travis-ci.org/peerigon/meetup-bridge.svg?branch=master)](https://travis-ci.org/peerigon/meetup-bridge) [![dependencies Status](https://david-dm.org/peerigon/meetup-bridge/status.svg)](https://david-dm.org/peerigon/meetup-bridge) [![devDependencies Status](https://david-dm.org/peerigon/meetup-bridge/dev-status.svg)](https://david-dm.org/peerigon/meetup-bridge?type=dev)

## Configuration

Create a `.env` file which contains the two essential parameters `API_KEY` and `PORT`. Like so:

```
// .env
API_KEY=<SUPER_SECURE_MEETUP_API_KEY>
PORT=<PORT>
```

## Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server for dev with `nodemon`
- `npm run lint` - Lint all the things!

## License

MIT © Peerigon GmbH
