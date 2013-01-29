/*jslint browser: true, devel: true, cap: false, maxerr: 65535*/
/*global window,j,php,Solera*/
/* vim: set ts=4:sw=4:sts=4smarttab:expandtab:autoindent */

if (!Solera) {
	var Solera = {};
}

/**
* Feel free to assign values to the various lists using
* the append() method of lists.
*
* The add* methods include data format checking, to verify
* that addresses look like addresses and ports include
* protocols.
*
* If you want to reset the lists, you can use the 
*/
Solera.Tuple = {
	/**
	* This is a list of source IP addresses (v4 or v6)
	*
	* [
	*	192.168.1.110,
	*	fe80:0:0:0:202:b3ff:fe1e:8329
	* ]
	*/
	sourceAddressV4List : [],

	sourceAddressV6List : [],

	/**
	* This is a list of dictionaries in the format
	*
	* [
	*	1234
	* ]
	*/
	sourcePortList : [],

	/**
	* This is a list of destination IP addresses (v4 or v6)
	*
	* [
	*	192.168.1.110
	* ]
	*/
	destinationAddressV4List : [],

	destinationAddressV6List : [],

	/**
	* This is a list of dictionaries in the format
	*
	* [
	*	1234
	* ]
	*/
	destinationPortList : [],

	protocol : 'tcp',

	/**
	* @param string direction source|destination
	* @return boolean
	*/
	addAddress: function (address, direction) {
		if (Solera.Util.isIPv4(address)) {
			if (direction === 'source') {
				if (!php.in_array(address, this.sourceAddressV4List)) {
					this.sourceAddressV4List.push(address);
				}
			} else if (direction === 'destination') {
				if (!php.in_array(address, this.destinationAddressV4List)) {
					this.destinationAddressV4List.push(address);
				}
			} else {
				return false;
			}

			return true;
		} else if (Solera.Util.isIPv6(address)) {
			if (direction === 'source') {
				if (!php.in_array(address, this.sourceAddressV6List)) {
					this.sourceAddressV6List.push(address);
				}
			} else if (direction === 'destination') {
				if (!php.in_array(address, this.destinationAddressV6List)) {
					this.destinationAddressV6List.push(address);
				}
			} else {
				return false;
			}

			return true;
		} else {
			return false;
		}
	},

	/**
	* @param string port Port number to record
	* @param string direction source|destination
	*/
	addPort: function (port, direction) {
		if (direction === 'source') {
			if (!php.in_array(port, this.sourcePortList)) {
				this.sourcePortList.push(port);
			}
			return true;
		} else if (direction === 'destination') {
			if (!php.in_array(port, this.destinationPortList)) {
				this.destinationPortList.push(port);
			}
			return true;
		} else {
			return false;
		}
	},

	removeAddress: function (address, version, direction) {
		Solera.Logger.log('Removing address from active list');

		var newTuple, x;

		newTuple = [];

		if (direction === 'source') {
			if (version === '4') {
				for (x in this.sourceAddressV4List) {
					if (address === this.sourceAddressV4List[x]) {
						Solera.Logger.log('Found source address in active list for removal');
						continue;
					} else {
						newTuple.push(this.sourceAddressV4List[x]);
					}
				}

				this.sourceAddressV4List = newTuple;
			} else if (version === '6') {
				for (x in this.sourceAddressV6List) {
					if (address === this.sourceAddressV6List[x]) {
						Solera.Logger.log('Found source address in active list for removal');
						continue;
					} else {
						newTuple.push(this.sourceAddressV6List[x]);
					}
				}

				this.sourceAddressV6List = newTuple;
			} else {
				return false;
			}

			return true;
		} else if (direction === 'destination') {
			if (version === '4') {
				for (x in this.destinationAddressV4List) {
					if (address === this.destinationAddressV4List[x]) {
						Solera.Logger.log('Found destination address in active list for removal');
						continue;
					} else {
						newTuple.push(this.destinationAddressV4List[x]);
					}
				}

				this.destinationAddressV4List = newTuple;
			} else if (version === '6') {
				for (x in this.destinationAddressV6List) {
					if (address === this.destinationAddressV6List[x]) {
						Solera.Logger.log('Found destination address in active list for removal');
						continue;
					} else {
						newTuple.push(this.destinationAddressV6List[x]);
					}
				}

				this.destinationAddressV6List = newTuple;
			} else {
				return false;
			}

			return true;
		} else {
			return false;
		}
	},

	removePort: function (port, direction) {
		Solera.Logger.log('Removing port from active list');

		var newTuple, x;

		newTuple = [];

		if (direction === 'source') {
			for (x in this.sourcePortList) {
				if (port === this.sourcePortList[x]) {
					Solera.Logger.log('Found source port in active list for removal');
					continue;
				} else {
					newTuple.push(this.sourcePortList[x]);
				}
			}

			this.sourcePortList = newTuple;
			return true;
		} else if (direction === 'destination') {
			for (x in this.destinationPortList) {
				if (port === this.destinationPortList[x]) {
					Solera.Logger.log('Found destination port in active list for removal');
					continue;
				} else {
					newTuple.push(this.destinationPortList[x]);
				}
			}

			this.destinationPortList = newTuple;
			return true;
		} else {
			return false;
		}
	},

	getParams: function () {
		var results = {};

		results.sourceAddressV4 = this.sourceAddressV4List;
		results.sourceAddressV6 = this.sourceAddressV6List;
		results.sourcePort = this.sourcePortList;
		results.destinationAddressV4 = this.destinationAddressV4List;
		results.destinationAddressV6 = this.destinationAddressV6List;
		results.destinationPort = this.destinationPortList;
		results.protocol = this.protocol;

		return results;
	}
};
