var assert = require("assert");
var l = require('../nlog').newL(__dirname);

describe('event', function(){
  var log_events = [];
  before(function() {
    l.addListener( 'log', function( _s, _m, _vs, _mvs, _f){
        var log_event_x = { 'severity' : _s
                          , 'raw_msg'  : _m 
                          , 'values'  : _vs
                          , 'formatted_msg'  : _mvs 
        };
        log_events.push( log_event_x);
    });
  });

  it('should be a foo note log', function(){
    l.note('foo');
    assert.equal( log_events[0].severity, 'note');
    assert.equal( log_events[0].raw_msg, 'foo');
  });

  it('should be a foo note log with bar value', function(){
    l.note('foo %s', ['bar']);
    assert.equal( log_events[1].severity, 'note');
    assert.equal( log_events[0].raw_msg, 'foo');
    assert.equal( log_events[1].formatted_msg, 'foo bar');
  });
});
