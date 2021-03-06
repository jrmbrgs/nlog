var path = require('path'),
    sys  = require('sys'),
    fs   = require('fs'),
    util = require('util'),
    e   = require('events');


var L = function( _log_adi){
    /// Log dir abs path & relative file name
    this._log_adi = _log_adi;
    this._log_rf = path.basename(require.main.filename, '.js');
    e.EventEmitter.call(this);
    /// Chech dir
    try{
    fs.lstatSync( this._log_adi, function( err, stats){
        if (err) {
            fs.mkdirSync(this._log_adi, 0755);
        } 
        else{
            if( false == stats.isDirectory()) {
                throw new Error('Unable to log in ' + this._log_adi);
            }
        }
    });
    } catch (err) {
        fs.mkdirSync(this._log_adi, 0755);
        console.log( err.code);
    }
    /// File handler
    this._log_afi = this._log_adi + '/' + this._log_rf + '.log'
    console.log(this._log_afi) ;
    this._fh = fs.createWriteStream( this._log_afi, {flags: 'a', encoding: 'utf8', mode: 0666});
    this._fh.write("\n");
}
sys.inherits(L, e.EventEmitter);

L.prototype.debug = function( _m, _vs, _f){
    this.log( 'debug', _m, _vs, _f);
}
L.prototype.note = function( _m, _vs, _f){
    this.log( 'note', _m, _vs, _f);
}
L.prototype.warn = function( _m, _vs, _f){
    this.log( 'warning', _m, _vs, _f);
}
L.prototype.err = function( _m, _vs, _f){
    this.log( 'error', _m, _vs, _f);
}

L.prototype.log = function( _serverity, _m, _vs, _f){
    // emit event on each log
    var m = typeof _m !== 'undefined' ? _m : '';
    var vs = typeof _vs !== 'undefined' ? _vs : [];
    var f = typeof _f !== 'undefined' ? _f : '';
    var mvs = util.format( m, vs);
    var msg = ">" + f + " " + mvs + "\n";
    this.emit('log', _serverity, m, vs, mvs, _f );
    this._fh.write([ new Date(),_serverity, msg].join(' '));
}

exports.L = L;
exports.newL = function( _log_adi) {
  return new L(_log_adi);
};
