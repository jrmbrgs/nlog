var assert = require("assert"),
    ee     = require('events').EventEmitter;
var l = require('../nlog').newL(__dirname);

describe('event', function(){
  it('should find a foo log event', function(){
    l.addListener('log', function( _severity, _msg, _val, _func){
        assert.equal('note', _severity);
        assert.equal('foo', _msg);
    });
    l.note('foo');
  });
});
