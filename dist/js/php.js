// vim: tabstop=4 shiftwidth=4 softtabstop=4
// jslint browser: true, devel: true, cap: false, maxerr: 65535
// global window, jQuery

php = {
	/**
	* php.js trim
	*
	* @author Kevin van Zonneveld <http://kevin.vanzonneveld.net>
	* @author mdsjack <http://www.mdsjack.bo.it>
	* @author Alexander Ermolaev <http://snippets.dzone.com/user/AlexanderErmolaev>
	* @author Erkekjetter
	* @author DxGx
	* @author Steven Levithan <http://blog.stevenlevithan.com>
	* @author Jack
	* @author Onno Marsman
	* @copyright 2010
	* @license MIT
	* @license GPL
	*/
	trim : function (str, charlist) {
		var whitespace, l = 0, i = 0;
		str += '';

		if (!charlist) {
			// default list
			whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
		} else {
			// preg_quote custom list
			charlist += '';
			whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
		}

		l = str.length;
		for (i = 0; i < l; i += 1) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(i);
				break;
			}
		}

		l = str.length;
		for (i = l - 1; i >= 0; i -= 1) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(0, i + 1);
				break;
			}
		}

		return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
	},

	/**
	* php.js array_merge
	*
	* @author Brett Zamir <http://brett-zamir.me>
	* @author Nate
	* @author josh
	* @copyright 2010
	* @license MIT
	* @license GPL
	*/
	array_merge : function () {
		var args, retObj, k, j, i, retArr, ct, ctTmp;

		args = Array.prototype.slice.call(arguments);
		retObj = {};
		k = 0;
		j = 0;
		i = 0;
		retArr = true;
		ct = 0;
		ctTmp = 0;

		for (i = 0; i < args.length; i += 1) {
			if (!(args[i] instanceof Array)) {
				retArr = false;
				break;
			}
		}
    
		if (retArr) {
			retArr = [];
			for (i = 0; i < args.length; i += 1) {
				retArr = retArr.concat(args[i]);
			}
			return retArr;
		}
    
		for (i = 0, ct = 0; i < args.length; i += 1) {
			if (args[i] instanceof Array) {
				for (j = 0; j < args[i].length; j += 1) {
					ctTmp = ct + 1;
					retObj[ctTmp] = args[i][j];
				}
			} else {
				for (k in args[i]) {
					if (args[i].hasOwnProperty(k)) {
						if (parseInt(k, 10) + '' === k) {
							ctTmp = ct + 1;
							retObj[ctTmp] = args[i][k];
						} else {
							retObj[k] = args[i][k];
						}
					}
				}
			}
		}

		return retObj;
	},

	/**
	* php.js empty
	*
	* @author Philippe Baumann
	* @author Onno Marsman
	* @author Kevin van Zonneveld <http://kevin.vanzonneveld.net>
	* @author LH
	* @author Francesco
	* @author Marc Jansen
	* @author Stoyan Kyosev <http://www.svest.org/>
	* @copyright 2010
	* @license MIT
	* @license GPL
	*/
	empty : function (mixed_var) {
		var key;

		if (mixed_var === "" ||
			mixed_var === 0 ||
			mixed_var === "0" ||
			mixed_var === null ||
			mixed_var === false ||
			mixed_var === "none" ||
			mixed_var === "None" ||
			typeof mixed_var === 'undefined'
		) {
			return true;
		}

		if (typeof mixed_var === 'object') {
			for (key in mixed_var) {
				return false;
			}
			return true;
		}

		return false;
	},

	/**
	* php.js in_array
	* @author Kevin van Zonneveld <http://kevin.vanzonneveld.net>
	* @author vlado houba
	* @author Billy
	* @author Brett Zamir <http://brett-zamir.me>
	*/
	in_array : function(needle, haystack) {
		var key = '';

		for (key in haystack) {
			if (haystack[key] == needle) {
				return true;
			}
		}

		return false;
	}
};
