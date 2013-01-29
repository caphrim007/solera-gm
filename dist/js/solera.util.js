/*jslint browser: true, devel: true, cap: false, maxerr: 65535*/
/*global window,j,php,Solera*/
/* vim: set ts=4:sw=4:sts=4smarttab:expandtab:autoindent */

if (!Solera) {
	var Solera = {};
}

Solera.Util = {
	IPv6Regex : /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
	IPv6RegexAny : /((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))/ig,
	IPv4Regex : /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
	IPv4RegexAny : /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/ig,
	IPValidChars : /[^0-9A-F:.]/gi,

	/**
	* The global "g" modifier at the end is needed or else the
	* Solera.Layout class will duplicate the spans that are created
	*/
	timegen: /([01]?[1-9]|[012][0-3])(?!\d):([0-6]\d)(?!\d):([0-6]\d)(?!\d)/ig,
	timeampm: /(0?[1-9]|10|11|12)(?!\d):([0-6]\d)(?!\d):([0-6]\d)(?!\d)\s?([ap]m)/ig,
	usdate1: /(0?[1-9]|1[012])(?!:)[\-\/](0?[1-9]|[12]\d|3[01])[\-\/](20\d\d|19\d\d|[901]\d(?!\d))/ig,
	usdatetime1: /(0?[1-9]|1[012])(?!:)[\-\/](0?[1-9]|[12]\d|3[01])[\-\/](20\d\d|19\d\d|[901]\d(?!\d))\s?([01]?[1-9]|[012][0-3])(?!\d):([0-6]\d)(?!\d):([0-6]\d)(?!\d)/ig,
	
	isIPv6 : function (address) {
		return (this.IPv6Regex.test(address));
	},

	isIPv4 : function (address) {
		return (this.IPv4Regex.test(address));
	},

	/**
	* Checks for empty addresses and removes non-IP characters
	* from an address
	*
	* @param string address IP address to clean up
	* @return string
	*/
	cleanAddress : function (address) {
		if (php.empty(address)) {
			return '';
		} else {
			return php.trim(address.replace(Solera.Util.IPValidChars, ''));
		}
	},

	/**
	* Creates the "stuff" for the DeepSee or Merge Path URLs that
	* is inbetween the suffix and prefix of the respective formats.
	*
	* For instance, all the common ipv4_address, tcp_port, etc
	* parameters that the URLs can use.
	*
	* @return string
	*/
	makeUrlBody : function () {
		var url, params;

		params = Solera.Tuple.getParams();

		url = '';

		if (!php.empty(params.protocol)) {
			Solera.Logger.log('Protocol was specified');
			if (!php.empty(params.sourcePort) && !php.empty(params.destinationPort)) {
				Solera.Logger.log('Neither sourcePort and destinationPort lists were empty');
				url += params.protocol + '_port/';
				url += params.sourcePort.join('_or_');
				url += '/';
				url += params.protocol + '_port/';
				url += params.destinationPort.join('_or_');
				url += '/';
			} else if (!php.empty(params.sourcePort)) {
				Solera.Logger.log('sourcePort list was not empty');
				url += params.protocol + '_port/';
				url += params.sourcePort.join('_or_');
				url += '/';
			} else if (!php.empty(params.destinationPort)) {
				Solera.Logger.log('destinationPort list was not empty');
				url += params.protocol + '_port/';
				url += params.destinationPort.join('_or_');
				url += '/';
			}
		}

		if (!php.empty(params.sourceAddressV4)) {
			// TODO: Change to originator when new soleraos is released
			// Used to be ipv4_source
			url += '/ipv4_address/';
			url += params.sourceAddressV4.join('_or_');
			url += '/';
		}

		if (!php.empty(params.destinationAddressV4)) {
			// TODO: Change to responder when new soleraos is released
			// Used to be ipv4_destination
			url += '/ipv4_address/';
			url += params.destinationAddressV4.join('_or_');
			url += '/';
		}

		if (!php.empty(params.sourceAddressV6)) {
			// TODO: Change to originator when new soleraos is released
			// Used to be ipv6_source
			url += '/ipv6_address/';
			url += params.sourceAddressV6.join('_or_');
			url += '/';
		}

		if (!php.empty(params.destinationAddressV6)) {
			// TODO: Change to responder when new soleraos is released
			// Used to be ipv6_destination
			url += '/ipv6_address/';
			url += params.destinationAddressV6.join('_or_');
			url += '/';
		}

		return url;
	},

	/**
	* URL format is
	*
	*   https://$host:$port/deepsee_reports?user=$usr&password=$pwd
	*   #pathString=/timespan/$start-$stop/$ipproto_port/$srcport_and_$dstport/
	*   ipv4_address/$srcip_and_$dstip/;reportIndex=0
	*
	* @param array params Javascript dict of params to stitch together
	* @return string
	*/
	getDeepSeeUrl : function () {
		var url, config, startTime, stopTime;

		Solera.Logger.log('Asked to get DeepSee URL');

		config = Solera.Config.getConfig();
		startTime = Solera.Layout.getFormattedStartTimestamp();
		stopTime = Solera.Layout.getFormattedStopTimestamp();

		if (php.empty(config.port)) {
			url = config.hostname;
		} else {
			url = config.hostname + ':' + config.port;
		}

		url += '/deepsee_reports?' +
			'username=' + config.username +
			'&password=' + config.password +
			'#pathString=/timespan/' + startTime + '.' + stopTime + '/';

		url += this.makeUrlBody();

		url += ';reportIndex=0';
		url = 'https://' + url.replace(/[\/]+/g, '/');

		return url;
	},

	/**
	* URL format is
	*
	*   https://$host:$port/ws/pcap?method=deepsee&
	*   path=/timespan/$start-$stop/$ipproto_port/$srcport_and_$dstport/
	*   ipv4_address/$srcip_and_$dstip/data.pcap&user=$usr&password=$pwd
	*
	* @param array
	* @return string
	*/
	getPcapUrl : function () {
		var url, config, startTime, stopTime;

		config = Solera.Config.getConfig();
		startTime = Solera.Layout.getFormattedStartTimestamp();
		stopTime = Solera.Layout.getFormattedStopTimestamp();

		if (php.empty(config.port)) {
			url = config.hostname;
		} else {
			url = config.hostname + ':' + config.port;
		}

		url += '/ws/pcap?method=deepsee&path=' +
			'/timespan/' + startTime + '.' + stopTime + '/';

		url += this.makeUrlBody();

		url += 'data.pcap&username=' + config.username +
			'&password=' + config.password;

		url = 'https://' + url.replace(/[\/]+/g, '/');

		return url;
	}
};

/**
* Replaces all instances of the given substring.a
* @see http://www.bennadel.com/blog/142-Ask-Ben-Javascript-String-Replace-Method.htm
*/
String.prototype.replaceAll = function (strTarget, strSubString) {
	var strText, intIndexOfMatch;
	strText = this;
	intIndexOfMatch = strText.indexOf(strTarget);

	// Keep looping while an instance of the target string
	// still exists in the string.
	while (intIndexOfMatch !== -1) {
		// Relace out the current instance.
		strText = strText.replace(strTarget, strSubString);

		// Get the index of any next matching substring.
		intIndexOfMatch = strText.indexOf(strTarget);
	}

	// Return the updated string with ALL the target strings
	// replaced out with the new substring.
	return strText;
};
