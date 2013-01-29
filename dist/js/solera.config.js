/*jslint browser: true, devel: true, cap: false, maxerr: 65535*/
/*global window,j,php,Solera,GM_getValue,GM_setValue*/
/* vim: set ts=4:sw=4:sts=4smarttab:expandtab:autoindent */

if (!Solera) {
	var Solera = {};
}

Solera.Config = {
	username : "admin",
	password : "password",
	hostname : "localhost",
	port : 443,

	initialize : function () {
		Solera.Logger.log('Initializing Solera.Config');
		this.load();
		this.populateConfigPopup();

	},

	save : function () {
		var username, password, hostname, port;

		Solera.Logger.log('Saving configuration');

		username = j('#configDiag input[name=username]').val();
		password = j('#configDiag input[name=password]').val();
		hostname = j('#configDiag input[name=hostname]').val();
		port = j('#configDiag input[name=port]').val();

		GM_setValue("username", username);
		GM_setValue("password", password);
		GM_setValue("hostname", hostname);
		GM_setValue("port", port);

		this.username = GM_getValue("username");
		this.password = GM_getValue("password");
		this.hostname = GM_getValue("hostname");
		this.port = GM_getValue("port");

		j('#configDiag, #mask').hide();
	},

	load : function () {
		Solera.Logger.log('Loading configuration');

		var gmInit;

		gmInit = GM_getValue('gmInit');

		if (gmInit === undefined) {
			Solera.Logger.log('First time loading configuration?');

			GM_setValue("username", this.username);
			GM_setValue("password", this.password);
			GM_setValue("hostname", this.hostname);
			GM_setValue("port", this.port);
			GM_setValue('gmInit', 1);
		} else {
			this.username = GM_getValue("username");
			this.password = GM_getValue("password");
			this.hostname = GM_getValue("hostname");
			this.port = GM_getValue("port");
		}

		Solera.Logger.log('Configuration loaded from GM');
	},

	populateConfigPopup : function () {
		var username, password, hostname, port;

		Solera.Logger.log('Pushing configuration into config popup window');

		username = j('#configDiag input[name=username]').val(this.username);
		password = j('#configDiag input[name=password]').val(this.password);
		hostname = j('#configDiag input[name=hostname]').val(this.hostname);
		port = j('#configDiag input[name=port]').val(this.port);
	},

	addHandlers : function () {
		Solera.Logger.log('Adding handlers for configuration dialog');

		j('#configuration .cancel').click(function () {
			/**
			* Resetting the form clears the form, instead of
			* putting the old values back. So to work around
			* this, pull the old values from the GM config
			* and re-populate the fields.
			*/
			Solera.Config.load();
			Solera.Config.populateConfigPopup();

			j('#configDiag, #mask').hide();
		});
	},

	getConfig: function () {
		var result;

		result = {};

		result.hostname = this.hostname;
		result.port = this.port;
		result.username = this.username;
		result.password = this.password;

		return result;
	}
};
