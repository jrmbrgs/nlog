var path = require('path'),
    sys  = require('sys'),
    fs   = require('fs');


var L = function( _log_adi){
    /// Log dir abs path & relative file name
    this._log_adi = _log_adi;
    this._log_rf = path.basename(require.main.filename, '.js');
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

L.prototype.note = function( _m, _v, _f){
    this.log( 'note', m, _v, _f);
}
L.prototype.err = function( _m, _v, _f){
    this.log( 'error', m, _v, _f);
}
L.prototype.warn = function( _m, _v, _f){
    this.log( 'warning', m, _v, _f);
}

L.prototype.log = function( _serverity, _m, _v, _f){
    m = typeof _m !== 'undefined' ? _m : '';
    v = typeof _v !== 'undefined' ? _v : '';
    f = typeof _f !== 'undefined' ? _f : '';
    var msg = ">" + f + " " + m + " : " + v + "\n";
    this._fh.write([ new Date(),_serverity, _msg].join(' '));
}

exports.L = L;
exports.newL = function( _log_adi) {
  return new L(_log_adi);
};
