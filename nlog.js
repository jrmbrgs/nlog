var path = require('path'),
    sys  = require('sys'),
    fs   = require('fs');
    url = require("url");


var L = function( _log_adi){
    /// Log dir abs path & relative file name
    this._log_adi = _log_adi;
    this._log_rf = path.basename(require.main.filename, '.js');
    /// Chech dir
    var lstats = fs.lstatSync( this._log_adi);
    console.log( this._log_adi);
    if( false === lstats.isDirectory( this._log_adi)){
        fs.mkdirSync(this._log_adi, 0755)
    }
    /// File handler
    this._log_afi = this._log_adi + '/' + this._log_rf + '.log'
    console.log(this._log_afi) ;
    this._fh = fs.createWriteStream( this._log_afi, {flags: 'a', encoding: 'utf8', mode: 0666});
    this._fh.write("\n");
}

L.prototype.note = function( _m, _v, _f){
    if( typeof _f == 'undefined') _f ='';
    if( typeof _v == 'undefined') _v ='';
    if( typeof _m == 'undefined') _m ='';
    var msg = ">" + _f + " " + _m + " : " + _v + "\n";
    this.log( 'note', msg);
}

L.prototype.log = function( _serverity, _msg){
    this._fh.write([ new Date(),_serverity, _msg].join(' '));
}

exports.L = L;
exports.newL = function( _log_adi) {
  return new L(_log_adi);
};
