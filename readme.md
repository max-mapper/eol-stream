# eol-stream

detect which type of EOL (AKA line-ending, newline) characters are in a stream

[![NPM](https://nodei.co/npm/eol-stream.png)](https://nodei.co/npm/eol-stream/)

## usage

```js
var eolStream = require('eol-stream')

fs.createReadStream('file.txt').pipe(eolStream(function (type) {
  
}))
```

`type` will be one of 4 things:

- `\r\n`
- `\r`
- `\n`
- undefined

`eol-stream` is a passthrough stream
