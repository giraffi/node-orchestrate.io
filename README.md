## node-orchestrate.io

A client implementation for Orchestrate.io in Node.js

### Setup
Require `orchestrate.io` and create a new object with your `api_key`:

```
io = require('orchestrate.io')
miao = io.creatClient({
  api_key: 'Your-API-key'
});
```

Or

```
$ export ORCHESTRATE_IO_API_KEY=Your-API-key
$ node
> io = require('orchestrate.io')
> miao = io.createClient;
```

And

```
var json_data = '{"Director": "Hayao Miyazaki"}'
var query_string = 'Genre:myth'
```

### Key/Value

#### Get
```
miao
  .getKeyValue({
    version: 'v0',
    collection: 'films',
    key: 'princess_mononoke'
  },
  function(err, data) {
    console.log(data);
  });
```

#### Put
```
miao
  .putKeyValue({
    version: 'v0',
    collection: 'films',
    key: 'princess_mononoke',
    data: json_data
  },
  function(err, data) {
    console.log(data);
  });
```

> under development ...
