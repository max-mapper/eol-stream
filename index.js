var through = require('through2')

var cr = new Buffer('\r')
var lf = new Buffer('\n')
var crlf = new Buffer('\r\n')

module.exports = function(cb) {
  var crAtEnd = false
  var detected = false
  function done(type) {
    detected = true
    cb(type)
  }
  var stream = through(function write(ch, enc, next) {
    if (detected) {
      this.push(ch)
      return next()
    }
    if (crAtEnd) {
      if (ch[0] === lf[0]) {
        done(crlf)
      } else {
        done(cr)
      }
      this.push(ch)
      return next()
    }
    for (var i = 0; i < ch.length; i++) {
      if (ch[i] === cr[0]) {
        if (i === ch.length - 1) crAtEnd = true
        else if (ch[i + 1] === lf[0]) done(crlf)
        else done(cr)
        break
      }
      if (ch[i] === lf[0]) {
        done(lf)
        break
      }
    }
    this.push(ch)
    next()
  }, function end(next) {
    if (!detected) done()
    next()
  })
  
  return stream
}