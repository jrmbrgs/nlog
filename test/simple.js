var expect = require('expect.js'),
    assert = require("assert"),
    ee     = require('events').EventEmitter;
var l = require('../nlog').newL(__dirname);

describe('event', function(){
  it('should find a foo log event', function(){
    l.addListener('log', function( _severity, _msg, _val, _func){
        expect( _severity).to.equal('note');
        expect( _msg).to.equal('foo');
    });
    l.note('foo');
  });
});
