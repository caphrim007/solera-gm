/*jslint browser: true, devel: true, cap: false, maxerr: 65535*/
/*global window,j,php,Solera*/
/* vim: set ts=4:sw=4:sts=4smarttab:expandtab:autoindent */

if (!Solera) {
	var Solera = {};
}

/**
*
*/
Solera.TupleLayout = {
	/**
	* @return string
	*/
	getSourceAddressList: function () {
		Solera.Logger.log('Rebuilding source address list menu');

		var content, totalSize, x;

		totalSize = Solera.Tuple.sourceAddressV4List.length + Solera.Tuple.sourceAddressV6List.length;
		if (totalSize === 0) {
			return '<span class="emptyMesg">Your source address list is empty</span>';
		}

		content = '<table class="tupleList">';

		for (x = 0; x < Solera.Tuple.sourceAddressV4List.length; x = x + 1) {
			content = content + '<tr>' +
				'<td class="content">' +
				'<input type="hidden" name="addr" value="' + Solera.Tuple.sourceAddressV4List[x] + '">' +
				Solera.Tuple.sourceAddressV4List[x] + '</td>' +
				'<td class="remove">X</td>' +
				'</tr>';
		}

		for (x = 0; x < Solera.Tuple.sourceAddressV6List.length; x = x + 1) {
			content = content + '<tr>' + '<td class="content">' +
				'<input type="hidden" name="addr" value="' + Solera.Tuple.sourceAddressV6List[x] + '">';

			if (Solera.Tuple.sourceAddressV6List[x].length > 27) {
				content += '<span title="' + Solera.Tuple.sourceAddressV6List[x] +
					'">' + Solera.Tuple.sourceAddressV6List[x].substring(0, 27) +
					'...' + '</span>';
			} else {
				content += Solera.Tuple.sourceAddressV6List[x];
			}
			content += '</td><td class="remove">X</td></tr>';
		}

		content = content + '</table>';
		return content;
	},

	getSourcePortList: function () {
		Solera.Logger.log('Rebuilding source port list menu');

		var content, x;

		if (Solera.Tuple.sourcePortList.length === 0) {
			return '<span class="emptyMesg">Your source port list is empty</span>';
		}

		content = '<table class="tupleList">';

		for (x = 0; x < Solera.Tuple.sourcePortList.length; x = x + 1) {
			content = content + '<tr>' +
				'<td class="content">' + Solera.Tuple.sourcePortList[x] + '</td>' +
				'<td class="remove">X</td>' +
				'</tr>';
		}

		content = content + '</table>';
		return content;
	},

	getDestinationAddressList: function () {
		Solera.Logger.log('Rebuilding destination address list menu');

		var content, totalSize, x;

		totalSize = Solera.Tuple.destinationAddressV4List.length + Solera.Tuple.destinationAddressV6List.length;
		if (totalSize === 0) {
			return '<span class="emptyMesg">Your destination address list is empty</span>';
		}

		content = '<table class="tupleList">';

		for (x = 0; x < Solera.Tuple.destinationAddressV4List.length; x = x + 1) {
			content = content + '<tr>' +
				'<td class="content">' +
				'<input type="hidden" name="addr" value="' + Solera.Tuple.destinationAddressV4List[x] + '">' +
				Solera.Tuple.destinationAddressV4List[x] + '</td>' +
				'<td class="remove">X</td>' +
				'</tr>';
		}

		for (x = 0; x < Solera.Tuple.destinationAddressV6List.length; x = x + 1) {
			content = content + '<tr>' + '<td class="content">' +
				'<input type="hidden" name="addr" value="' + Solera.Tuple.destinationAddressV6List[x] + '">';

			if (Solera.Tuple.destinationAddressV6List[x].length > 27) {
				content += '<span title="' + Solera.Tuple.destinationAddressV6List[x] +
					'">' + Solera.Tuple.destinationAddressV6List[x].substring(0, 27) +
					'...' + '</span>';
			} else {
				content += Solera.Tuple.destinationAddressV6List[x];
			}
			content += '</td><td class="remove">X</td></tr>';
		}

		content = content + '</table>';
		return content;
	},

	getDestinationPortList: function () {
		Solera.Logger.log('Rebuilding destination port list menu');

		var content, x;

		if (Solera.Tuple.destinationPortList.length === 0) {
			return '<span class="emptyMesg">Your destination port list is empty</span>';
		} else {
			Solera.Logger.log('Processing ' + Solera.Tuple.destinationPortList.length + ' items in destination port list');
		}

		content = '<table class="tupleList">';

		for (x = 0; x < Solera.Tuple.destinationPortList.length; x = x + 1) {
			content = content + '<tr>' +
				'<td class="content">' + Solera.Tuple.destinationPortList[x] + '</td>' +
				'<td class="remove">X</td>' +
				'</tr>';
		}

		content = content + '</ul>';
		return content;
	}
};
