var test = require('tape')
var eolStream = require('./')

test('crlf in one buffer', function(t) {
  var buffer = new Buffer('hello yes this\r\n is dog')
  var es = eolStream(function(type) {
    t.equal(type.toString(), '\r\n', 'matched CRLF')
    t.end()
  })
  es.write(buffer)
  es.end()
})

test('crlf in two buffers', function(t) {
  var buf1 = new Buffer('hello yes this\r')
  var buf2 = new Buffer('\n is dog')
  var es = eolStream(function(type) {
    t.equal(type.toString(), '\r\n', 'matched CRLF')
    t.end()
  })
  es.write(buf1)
  es.write(buf2)
  es.end()
})

test('cr in two buffers', function(t) {
  var buf1 = new Buffer('hello yes this\r')
  var buf2 = new Buffer('is dog')
  var es = eolStream(function(type) {
    t.equal(type.toString(), '\r', 'matched CR')
    t.end()
  })
  es.write(buf1)
  es.write(buf2)
  es.end()
})

test('lf in second buffer', function(t) {
  var buf1 = new Buffer('hello yes this')
  var buf2 = new Buffer('is \n dog')
  var es = eolStream(function(type) {
    t.equal(type.toString(), '\n', 'matched LF')
    t.end()
  })
  es.write(buf1)
  es.write(buf2)
  es.end()
})

test('type is undefined', function(t) {
  var es = eolStream(function(type) {
    t.equal(type, undefined, 'type is undefined')
    t.end()
  })
  es.write(new Buffer('hello this'))
  es.write(new Buffer('is dog'))
  es.end()
})

test('passthrough stream', function(t) {
  var es = eolStream(function(type) {})
  var es2 = eolStream(function(type) {
    t.equal(type.toString(), '\r\n', 'matched CRLF')
    t.end()
  })
  es.pipe(es2)
  es.write(new Buffer('hello this\r'))
  es.write(new Buffer('\nis dog'))
  es.end()
})
