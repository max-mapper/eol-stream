# eol-stream

detect which type of EOL (AKA line-ending, newline) characters are in a stream

[![NPM](https://nodei.co/npm/eol-stream.png)](https://nodei.co/npm/eol-stream/)

## usage

this example reads a csv, detects which type of newlines it uses, and then creates a new
csv parser set to parse those types of newlines

```js
var eolStream = require('eol-stream')
var bcsv = require('binary-csv')
var fs = require('fs')

var fileStream = fs.createReadStream(process.argv[2])
var es = eolStream(function (type) {
  var csvParser = bcsv({newline: type.toString(), json: true})
  es.pipe(csvParser).pipe(require('stdout')())
})

fileStream.pipe(es)
```

`type` will be one of 4 things:

- `\r\n`
- `\r`
- `\n`
- undefined

`eol-stream` is a passthrough stream
