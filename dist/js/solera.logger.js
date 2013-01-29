/*jslint browser: true, devel: true, cap: false, maxerr: 65535*/
/*global window,j,php,GM_log,Solera*/
/* vim: set ts=4:sw=4:sts=4smarttab:expandtab:autoindent */

if (!Solera) {
    var Solera = {};
}

Solera.Logger = {
	log : function (message) {
		GM_log(message);
	}
};
