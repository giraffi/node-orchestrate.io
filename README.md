# node-orchestrate.io

A client implementation for Orchestrate.io in Node.js

## Setup
Require `orchestrate.io` and create a new object with your `api_key`:

```
io = require('orchestrate.io')
miao = io.creatClient({
  apikey: 'Your-API-key'
});
```

Or

```
$ export ORCHESTRATE_IO_APIKEY=Your-API-key
$ node
> io = require('orchestrate.io')
> miao = io.createClient;
```

And

```
var data = { "Title": "Rashomon" }
var queryString = 'Genre:myth'
```

## Usage

### Key/Value

#### Get

```
miao
  .getKeyValue({
    collection: 'films',
    key: 'kurosawa'
  },
  function (err, data) {
    console.log(data);
  });
```

#### Put

```
miao
  .putKeyValue({
    collection: 'films',
    key: 'kurosawa',
    data: data
  },
  function (err, data) {
    console.log(data);
  });
```

### Search

```
miao
  .search({
    collection: 'films',
    query: 'Genre:crime'
  },
  function (err, data) {
    console.log(data);
  });
```

### Events

#### Get

```
miao
  .getEvent({
    collection: 'films',
    key: 'kurosawa',
    type: 'comments',
    start: 1388051827,
    end: 1388051845,
  },
  function (err, data) {
    console.log(data);
  });
```

#### Put

```
miao
  .putEvent({
    collection: 'films',
    key: 'kurosawa',
    type: 'comments',
    data: { note: "Magnifique!" },
    timestamp: 1388051845
  },
  function (err, data) {
    console.log(data);
  });
```

### Graph

#### Get

```
miao
  .getGraph({
    collection: 'films',
    key: 'kurosawa',
    relation: 'princess_mononoke',
  },
  function (err, data) {
    console.log(data);
  });
```

#### Put

```
miao
  .putGraph({
    collection: 'films',
    key: 'kurosawa',
    relation: 'samurai',
    toCollection: 'films',
    toKey: 'preincess_mononoke'
  },
  function (err, data) {
    console.log(data);
  });
```

## Test

Run `make test` to test all

```bash
$ make test
```
