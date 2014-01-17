nlog
====

A simple node file logger
[![Build Status](https://secure.travis-ci.org/jrmbrgs/nlog.png)](http://travis-ci.org/jrmbrgs/nlog)

### USAGE
As simple as possible

    // Instantiation
    var l = require('nlog').new( __dirname + '/logs') ;
    //Logging
    ...
    l.note('Yay');
    
Four lvl of severities : 

    debug, note, warn, err

Every logging func take 3 args :
m : the message to log
v : (optional) the value related to the message
f : (optional) the function which has log

    l.err('Smgth really bad happens', value, func_name);

The above statement will log :

    Thu Dec 19 2013 19:20:52 GMT+0100 (CET) error >func_name Smgth really bad happens : value
