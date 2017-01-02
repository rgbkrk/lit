# lit

Trying alternative approaches to a state tree for notebooks, including the way
reducers and state are set up. Core differences to nteract currently:

* `lodash/fp` instead of Immutable.js / commutable
* `flow` typing for more strict typing
* not actually a full implementation, just tinkering

## Development

This is only a prototype, I wouldn't expect this to be well documented. It's my
own little exploration that I'm putting out there to understand some other approaches.
To get this set up, make sure you have the development dependencies:

### Development dependencies

* node.js
* `yarn`
* a clone of this repo

### Install Development Mode

```
yarn
yarn start
```

### Additional Notes for Development

The Redux devtools are configured for use by the chrome extension. Running this
hand-in-hand with the React dev tools makes for a nice experience.
