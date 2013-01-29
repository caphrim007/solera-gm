/*jslint browser: true, devel: true, cap: false, maxerr: 65535*/
/*global window,j,php,Solera,GM_setValue,GM_getValue,globalImageSrc,XPathResult,iCounter,menuSwitch*/
/* vim: set ts=4:sw=4:sts=4smarttab:expandtab:autoindent */

if (!Solera) {
	var Solera = {};
}

Solera.Layout = {
	initialize : function () {
		var datePast, dateFuture, startTs, stopTs;

		Solera.Logger.log('Initializing Solera.Layout');

		datePast = new Date().add({minutes: -5});
		dateFuture = new Date().add({minutes: 5});

		startTs = {
			month: datePast.toString('MM'),
			day: datePast.toString('dd'),
			year: datePast.toString('yyyy'),
			hour: datePast.toString('HH'),
			minute: datePast.toString('mm'),
			second: datePast.toString('ss')
		};

		stopTs = {
			month: dateFuture.toString('MM'),
			day: dateFuture.toString('dd'),
			year: dateFuture.toString('yyyy'),
			hour: dateFuture.toString('HH'),
			minute: dateFuture.toString('mm'),
			second: dateFuture.toString('ss')
		};

		this.setStartTimestamp(startTs);
		this.setStopTimestamp(stopTs);
	},

	addHandlers: function () {
		Solera.Logger.log('Adding handlers for Solera.Layout');

		this.initializeSpinHandlers();
		this.initializeManualButtonHandlers();
		this.initializeSubmitButtonHandlers();

		j('#protocolBlock input[name=protocol]').click(function () {
			Solera.Tuple.protocol = j(this).val();
		});

		j('#soleraAddIpBox .addSource').click(function () {
			var address;

			address = GM_getValue('hoverAddress');
			Solera.Tuple.addAddress(address, 'source');
			Solera.Layout.remakeTupleList('sourceAddress');
			j('#soleraAddIpBox').hide();
		});

		j('#soleraAddIpBox .addDest').click(function () {
			var address;

			address = GM_getValue('hoverAddress');
			Solera.Tuple.addAddress(address, 'destination');
			Solera.Layout.remakeTupleList('destinationAddress');
			j('#soleraAddIpBox').hide();
		});

		j('#soleraAddTimeBox .setStartTime').click(function () {
			var theTime, matches, hour, minute, second, startTs;

			theTime = GM_getValue('hoverTime');

			Solera.Util.timegen.lastIndex = 0;
			matches = Solera.Util.timegen.exec(theTime);
			hour = matches[1];
			if (hour.length < 2) {
				hour = '0' + hour;
			}
			minute = matches[2];
			if (minute.length < 2) {
				minute = '0' + minute;
			}
			second = matches[3];
			if (second.length < 2) {
				second = '0' + second;
			}

			startTs = {
				month: j('#start_month').val(),
				day: j('#start_day').val(),
				year: j('#start_year').val(),
				hour: hour,
				minute: minute,
				second: second
			};
			Solera.Layout.setStartTimestamp(startTs);
			j('#soleraAddTimeBox').hide();
		});

		j('#soleraAddTimeBox .setStopTime').click(function () {
			var theTime, matches, hour, minute, second, stopTs;

			theTime = GM_getValue('hoverTime');
			Solera.Logger.log(theTime);

			Solera.Util.timegen.lastIndex = 0;
			matches = Solera.Util.timegen.exec(theTime);
			hour = matches[1];
			if (hour.length < 2) {
				hour = '0' + hour;
			}
			minute = matches[2];
			if (minute.length < 2) {
				minute = '0' + minute;
			}
			second = matches[3];
			if (second.length < 2) {
				second = '0' + second;
			}

			stopTs = {
				month: j('#stop_month').val(),
				day: j('#stop_day').val(),
				year: j('#stop_year').val(),
				hour: hour,
				minute: minute,
				second: second
			};
			Solera.Layout.setStopTimestamp(stopTs);
			j('#soleraAddTimeBox').hide();
		});

		j('#soleraAddTimeAmBox .setStartTime').click(function () {
			var time, matches, hour, minute, second, ampm, startTs;

			time = GM_getValue('hoverTimeAm');

			Solera.Util.timeampm.lastIndex = 0;
			matches = Solera.Util.timeampm.exec(time);
			hour = matches[1];
			if (hour.length < 2) {
				hour = '0' + hour;
			}
			minute = matches[2];
			if (minute.length < 2) {
				minute = '0' + minute;
			}
			second = matches[3];
			if (second.length < 2) {
				second = '0' + second;
			}
			ampm = matches[4].toLowerCase();
			if (ampm === 'pm') {
				hour = parseInt(hour, 10) + 12;
			}

			startTs = {
				month: j('#start_month').val(),
				day: j('#start_day').val(),
				year: j('#start_year').val(),
				hour: hour,
				minute: minute,
				second: second
			};
			Solera.Layout.setStartTimestamp(startTs);
			j('#soleraAddTimeAmBox').hide();
		});

		j('#soleraAddTimeAmBox .setStopTime').click(function () {
			var time, matches, hour, minute, second, ampm, stopTs;

			time = GM_getValue('hoverTimeAm');

			Solera.Util.timeampm.lastIndex = 0;
			matches = Solera.Util.timeampm.exec(time);
			hour = matches[1];
			if (hour.length < 2) {
				hour = '0' + hour;
			}
			minute = matches[2];
			if (minute.length < 2) {
				minute = '0' + minute;
			}
			second = matches[3];
			if (second.length < 2) {
				second = '0' + second;
			}
			ampm = matches[4].toLowerCase();
			if (ampm === 'pm') {
				hour = parseInt(hour, 10) + 12;
			}

			stopTs = {
				month: j('#stop_month').val(),
				day: j('#stop_day').val(),
				year: j('#stop_year').val(),
				hour: hour,
				minute: minute,
				second: second
			};
			Solera.Layout.setStopTimestamp(stopTs);
			j('#soleraAddTimeAmBox').hide();
		});

		j('#soleraAddDateBox .setStartDate').click(function () {
			var theDate, matches, month, day, year, startTs;

			theDate = GM_getValue('hoverDate');

			Solera.Util.usdate1.lastIndex = 0;
			matches = Solera.Util.usdate1.exec(theDate);
			month = matches[1];
			if (month.length < 2) {
				month = '0' + month;
			}
			day = matches[2];
			if (day.length < 2) {
				day = '0' + day;
			}
			year = matches[3];
			if (year.length <= 2) {
				year = parseInt(year, 10);
				year = year + 2000;
			} else {
				year = parseInt(year, 10);
			}

			startTs = {
				month: month,
				day: day,
				year: year,
				hour: j('#start_hour').val(),
				minute: j('#start_minute').val(),
				second: j('#start_second').val()
			};
			Solera.Layout.setStartTimestamp(startTs);
			j('#soleraAddDateBox').hide();
		});

		j('#soleraAddDateBox .setStopDate').click(function () {
			var theDate, matches, month, day, year, stopTs;

			theDate = GM_getValue('hoverDate');

			Solera.Util.usdate1.lastIndex = 0;
			matches = Solera.Util.usdate1.exec(theDate);
			month = matches[1];
			if (month.length < 2) {
				month = '0' + month;
			}
			day = matches[2];
			if (day.length < 2) {
				day = '0' + day;
			}
			year = matches[3];
			if (year.length <= 2) {
				year = parseInt(year, 10);
				year = year + 2000;
			} else {
				year = parseInt(year, 10);
			}

			stopTs = {
				month: month,
				day: day,
				year: year,
				hour: j('#stop_hour').val(),
				minute: j('#stop_minute').val(),
				second: j('#stop_second').val()
			};
			Solera.Layout.setStopTimestamp(stopTs);
			j('#soleraAddDateBox').hide();
		});

		j('#soleraAddDateTimeBox .setStartDate').click(function () {
			var theDate, matches, month, day, year, hour, minute, second, startTs;

			theDate = GM_getValue('hoverDateTime');

			Solera.Util.usdatetime1.lastIndex = 0;
			matches = Solera.Util.usdatetime1.exec(theDate);
			month = matches[1];
			if (month.length < 2) {
				month = '0' + month;
			}
			day = matches[2];
			if (day.length < 2) {
				day = '0' + day;
			}
			year = matches[3];
			if (year.length <= 2) {
				year = parseInt(year, 10);
				year = year + 2000;
			} else {
				year = parseInt(year, 10);
			}

			hour = matches[4];
			if (hour.length < 2) {
				hour = '0' + hour;
			}
			minute = matches[5];
			if (minute.length < 2) {
				minute = '0' + minute;
			}
			second = matches[6];
			if (second.length < 2) {
				second = '0' + second;
			}

			startTs = {
				month: month,
				day: day,
				year: year,
				hour: hour,
				minute: minute,
				second: second
			};
			Solera.Layout.setStartTimestamp(startTs);
			j('#soleraAddDateTimeBox').hide();
		});

		j('#soleraAddDateTimeBox .setStopDate').click(function () {
			var theDate, matches, month, day, year, hour, minute, second, stopTs;

			theDate = GM_getValue('hoverDateTime');

			Solera.Util.usdatetime1.lastIndex = 0;
			matches = Solera.Util.usdatetime1.exec(theDate);
			month = matches[1];
			if (month.length < 2) {
				month = '0' + month;
			}
			day = matches[2];
			if (day.length < 2) {
				day = '0' + day;
			}
			year = matches[3];
			if (year.length <= 2) {
				year = parseInt(year, 10);
				year = year + 2000;
			} else {
				year = parseInt(year, 10);
			}

			hour = matches[4];
			if (hour.length < 2) {
				hour = '0' + hour;
			}
			minute = matches[5];
			if (minute.length < 2) {
				minute = '0' + minute;
			}
			second = matches[6];
			if (second.length < 2) {
				second = '0' + second;
			}

			stopTs = {
				month: month,
				day: day,
				year: year,
				hour: hour,
				minute: minute,
				second: second
			};
			Solera.Layout.setStopTimestamp(stopTs);
			j('#soleraAddDateTimeBox').hide();
		});

		j('#solera-submenu .submenu').each(function () {
			j(this).css('position', 'fixed');
		});

		this.initAddressOutline();
	},

	initAddressOutline: function () {
		var iframes, d, i, frameCount;

		/**
		* This parses what is generally the host document
		*
		* In the case of frames, they will not be included
		* in the general document because they are instead
		* in documents of the frames themselves.
		*/
		this.evaluateDocumentElements(document);

		/**
		* Frames should be removed from HTML. They cause
		* far too many problems when trying to manipulate
		* DOMs because each frame has it's own DOM.
		*/
		frameCount = window.frames.length;
		if (frameCount > 0) {
//			Solera.Logger.log(frameCount + ' frame(s) were found on the page');
			iframes = window.frames;

			for (i = 0; i < iframes.length; i = i + 1) {
				d = iframes[i].document;
				if (d) {
					/**
					* You need to attach a click handler to the document
					* of the frame or else the popup window that is made
					* when you hover over something will not close if you
					* click on frame material.
					*/
					d.addEventListener('click', Solera.Layout.hideDocumentMenus, false);
					this.evaluateDocumentElements(d);
				}
			}
		}
	},

	hideDocumentMenus: function () {
		menuSwitch = undefined;
		j('.submenu, .addmenu').hide();
	},

	evaluateDocumentElements: function (doc) {
		var span, source, matched, an, i, re, startIndex,
			result, item, k, m, non, regex, matchType, className,
			idName, gmKey;

		//Use X-Path to evaluate the anchor-tags
		an = doc.evaluate('.//text()[normalize-space(.) != ""]', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		for (i = 0, item; (item = an.snapshotItem(i)); i = i + 1) {
			source = item.data;
			matched = false;

			if (Solera.Util.IPv6RegexAny.test(source)) {
				regex = Solera.Util.IPv6RegexAny;
				matched = true;
				matchType = 'ip';
				className = 'soleraIpBox';
				idName = 'soleraAddIpBox';
				gmKey = 'hoverAddress';
			} else if (Solera.Util.IPv4RegexAny.test(source)) {
				regex = Solera.Util.IPv4RegexAny;
				matched = true;
				matchType = 'ip';
				className = 'soleraIpBox';
				idName = 'soleraAddIpBox';
				gmKey = 'hoverAddress';
			} else if (Solera.Util.usdatetime1.test(source)) {
				regex = Solera.Util.usdatetime1;
				matched = true;
				matchType = 'dateTime';
				className = 'soleraDateTimeBox';
				idName = 'soleraAddDateTimeBox';
				gmKey = 'hoverDateTime';
			} else if (Solera.Util.usdate1.test(source)) {
				regex = Solera.Util.usdate1;
				matched = true;
				matchType = 'date';
				className = 'soleraDateBox';
				idName = 'soleraAddDateBox';
				gmKey = 'hoverDate';
			} else if (Solera.Util.timeampm.test(source)) {
				regex = Solera.Util.timeampm;
				matched = true;
				matchType = 'timeampm';
				className = 'soleraTimeAmBox';
				idName = 'soleraAddTimeAmBox';
				gmKey = 'hoverTimeAm';
			} else if (Solera.Util.timegen.test(source)) {
				regex = Solera.Util.timegen;
				matched = true;
				matchType = 'time';
				className = 'soleraTimeBox';
				idName = 'soleraAddTimeBox';
				gmKey = 'hoverTime';
			}

			if (matched) {
				if (this.shouldSkipFinding(item)) {
					continue;
				} else {
					span = doc.createElement("span");
				}

				item.parentNode.replaceChild(span, item);

				result = source.match(regex);

				re = new RegExp(regex);

				startIndex = 0;

				// for each IP found
				for (k = 0; k < result.length; k = k + 1) {
					m = re.exec(source);

					//get text except ip
					non = source.substr(startIndex, m.index - startIndex);

					span.appendChild(doc.createTextNode(non));
					span.appendChild(this.getWrappedItem(doc, m[0], className, idName, gmKey));

					//create new start index
					startIndex = m[0].length + m.index;
				}

				//also catch the text after last found ip
				span.appendChild(doc.createTextNode(source.substr(startIndex)));
				span.normalize();
			}

		}
	},

	shouldSkipFinding: function (item) {
		var isStyle, isTaggedIp, isTaggedDate, isTaggedTime,
			isTaggedTimeAm, isTaggedDateTime, isBar;

		// This is here because google.com sucks and uses iframes
		// and has IP address look-alikes in their styles. oh. my. god.
		isStyle = j(item).parents('head').size();
		if (isStyle > 0) {
			return true;
		}

		// This skips re-highlighting IP addresses that have already
		// been highlighted
		isTaggedIp = j(item).parents('span').hasClass('soleraIpBox');
		if (isTaggedIp) {
			return true;
		}

		// This skips re-highlighting dates that have already
		// been highlighted
		isTaggedDate = j(item).parents('span').hasClass('soleraDateBox');
		if (isTaggedDate) {
			return true;
		}

		// This skips re-highlighting timestamps that have already
		// been highlighted
		isTaggedTime = j(item).parents('span').hasClass('soleraTimeBox');
		if (isTaggedTime) {
			return true;
		}

		// This skips re-highlighting datetimes that have already
		// been highlighted
		isTaggedTimeAm = j(item).parents('span').hasClass('soleraTimeAmBox');
		if (isTaggedTimeAm) {
			return true;
		}

		isTaggedDateTime = j(item).parents('span').hasClass('soleraDateTimeBox');
		if (isTaggedDateTime) {
			return true;
		}

		// Prevent highlighting of the IP addresses in the tuple bar
		isBar = j(item).parents('.solera-bar').size();
		if (isBar > 0) {
			return true;
		}

		return false;
	},

	getWrappedItem: function (doc, item, className, idName, gmKey) {
		var content;

		content = doc.createElement("span");
		iCounter += 1;

		content.id = className + '_' + iCounter;
		content.innerHTML = item;
		content.className = className;

		content.addEventListener("mousemove", function (e) {
			var offsetX, offsetY, item, box;

			offsetX = 0;
			offsetY = 10;

			item = content.innerHTML;
			GM_setValue(gmKey, item + '');
			Solera.Logger.log('Set key "' + gmKey + '" to value "' + item + '"');

			if (j('#' + content.id).size() > 0) {
				j('.addmenu').hide();
				j('#' + idName).show();
				j('#' + idName).position({
					of: j('#' + content.id),
					my: 'center top',
					at: 'center bottom',
					offset: offsetX + ' ' + offsetY
				});
			} else {
				Solera.Layout.applySoleraBoxToFrames(content.id, idName);
			}
		}, false);

		return content;
	},

	applySoleraBoxToFrames: function (contentId, idName) {
		var frameCount, frames, d, frameName, an,
		    span, finding, isIFrameName, isFrame,
		    pos, tar, offsetX, offsetY, i;

		offsetX = 0;
		offsetY = 10;

		frameCount = window.frames.length;
		if (frameCount > 0) {
			/**
			* Alrighty, this is searching through the host document
			* looking for iframes and frames because those are the
			* worst offenders when it comes to figuring out where
			* in the other DOM trees the elements we are highlighting
			* are.
			*/
			frames = window.frames;
			for (i = 0; i < frames.length; i = i + 1) {
				d = frames[i].document;
				if (d) {
					try {
						/**
						* The name of the frame is the only identifier
						* that we have to work with, so it will be used
						* along with a jQuery selector to get the right
						* from from the host document.
						*/
						frameName = frames[i].name;

						/**
						* jQuery contents() method does not appear to work
						* on frames whose content has been loaded by an
						* anchor tag. However, doing an XPath evaluation of
						* the guest DOM document DOES work.
						*
						* This evaluation uses the highlighted tuples ID
						* which is guaranteed to be unique.
						*/
						an = d.evaluate('//span[@id="' + contentId + '"]',
							d, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
							null
						);

						/**
						* And because the IDs are unique, if we get a hit,
						* we can be sure it is the element we want to get
						* the position of.
						*/
						if (an.snapshotLength === 0) {
							continue;
						}

						// These are IDs so they should always be unique
						span = an.snapshotItem(0);
						finding = j(span);

						/**
						* This is ridiculous.
						*
						* Frames apparently do not have position values.
						* They instead have offset values. This is just
						* an effort at "best guess". In the wild if the
						* frame dimensions get sufficiently complicated
						* I can't guess at how accurate the values of
						* the isFrame offset() will be. I found iFrames
						* to be pretty reliable however.
						*/
						isIFrameName = j('iframe[name="' + frameName + '"]').size();
						isFrame = j('frame[name="' + frameName + '"]').size();
						if (isIFrameName > 0) {
							/**
							* pos is the position of the iframe in the host DOM.
							*/
							pos = j('iframe[name="' + frameName + '"]').position();
						} else if (isFrame > 0) {
							/**
							* pos is the position of the frame in the host DOM
							* relative to the host DOM's document. Try saying
							* that 10 times fast.
							*/
							pos = j('frame[name="' + frameName + '"]').offset();
						} else {
							Solera.Logger.log('Neither frame nor iframe were found. Returning');
							return;
						}

						/**
						* tar is the position of the IP wrapped ID inside of
						* the guest frame's DOM.
						*/
						tar = finding.position();

						/**
						* Ok, so to calculate this mess, I add together the
						* offset of the
						*
						*   frame
						*   the IP wrapper
						*   the width of the IP wrapper
						*
						* This will put the soleraAddBox's top left corner
						* at the center of the IP tuple item.
						*
						* Then, I subtract half the width of the soleraAddBox.
						* This will put the center of the soleraAddBox at the
						* center of the IP tuple.
						*
						* If the soleraAddBox is off the left side of the page,
						* I just bump it up against the exact left side of the
						* page.
						*
						* I imagine it would be smart to also do the same sort
						* of checking to make sure the other edges of the
						* soleraAddBox are not off the top, bottom, or right
						* sides of the screen, but the current code does not
						* do that checking.
						*/
						offsetX += parseInt(pos.left, 10);
						offsetX += parseInt(tar.left, 10);
						offsetX += Math.floor(parseInt(finding.width(), 10) / 2);
						offsetX -= Math.floor(parseInt(j('#' + idName).width(), 10) / 2);
						if (offsetX < 0) {
							offsetX = 0;
						}

						/**	
						* The top offset of the soleraAddBox is calculated
						* similarly, but doesn't need any of the subtracting
						* or dividing calculations
						*/
						offsetY += parseInt(pos.top, 10);
						offsetY += parseInt(tar.top, 10);
						offsetY += parseInt(finding.height(), 10);

//						Solera.Logger.log('left: ' + offsetX + ' top: ' + offsetY);

						j('#' + idName).show();
						j('#' + idName).css('top', offsetY);
						j('#' + idName).css('left', offsetX);
					} catch (err) {
						Solera.Logger.log(err);
					}
				}
			}
		}
	},

	setStartTimestamp: function (ts) {
		j('#start_month').val(ts.month);
		j('#start_day').val(ts.day);
		j('#start_year').val(ts.year);
		j('#start_hour').val(ts.hour);
		j('#start_minute').val(ts.minute);
		j('#start_second').val(ts.second);
	},

	setStopTimestamp: function (ts) {
		j('#stop_month').val(ts.month);
		j('#stop_day').val(ts.day);
		j('#stop_year').val(ts.year);
		j('#stop_hour').val(ts.hour);
		j('#stop_minute').val(ts.minute);
		j('#stop_second').val(ts.second);
	},

	getFormattedStartTimestamp: function () {
		var tuple;

		tuple = [];
		tuple.push(j('#start_year').val());
		tuple.push(j('#start_month').val());
		tuple.push(j('#start_day').val());
		tuple.push(j('#start_hour').val());
		tuple.push(j('#start_minute').val());
		tuple.push(j('#start_second').val());

		return tuple.join('.');
	},

	getFormattedStopTimestamp: function () {
		var tuple;

		tuple = [];
		tuple.push(j('#stop_year').val());
		tuple.push(j('#stop_month').val());
		tuple.push(j('#stop_day').val());
		tuple.push(j('#stop_hour').val());
		tuple.push(j('#stop_minute').val());
		tuple.push(j('#stop_second').val());

		return tuple.join('.');
	},

	initializeSpinHandlers: function () {
		Solera.Logger.log('Initializing spin handlers');

		// Registers the click handlers on the timespan to allow
		// incrementing and decrementing of the time
		j('#start_month').spin({min: 1, max: 12, padZero: true});
		j('#start_day').spin({min: 1, max: 31, padZero: true});
		j('#start_year').spin({min: 1970, max: 2050});
		j('#start_hour').spin({min: 0, max: 23, padZero: true});
		j('#start_minute').spin({min: 0, max: 59, padZero: true});
		j('#start_second').spin({min: 0, max: 59, padZero: true});

		j('#stop_month').spin({min: 1, max: 12, padZero: true});
		j('#stop_day').spin({min: 1, max: 31, padZero: true});
		j('#stop_year').spin({min: 1970, max: 2050});
		j('#stop_hour').spin({min: 0, max: 23, padZero: true});
		j('#stop_minute').spin({min: 0, max: 59, padZero: true});
		j('#stop_second').spin({min: 0, max: 59, padZero: true});

		Solera.Logger.log('Spin handlers have been initialized');
	},

	initializeManualButtonHandlers: function () {
		j('#sourceAddressBlock input[name=add]').click(function () {
			var value, result;

			Solera.Logger.log('Adding new source address to tuple list');

			value = j('#sourceAddressBlock input[name=sourceAddress]').val();
			result = Solera.Tuple.addAddress(value, 'source');

			j('#sourceAddressBlock form')[0].reset();
			Solera.Layout.remakeTupleList('sourceAddress');
		});

		j('#sourcePortBlock input[name=add]').click(function () {
			var value, result;

			Solera.Logger.log('Adding new source port and protocol to tuple list');

			value = j('#sourcePortBlock input[name=sourcePort]').val();
			result = Solera.Tuple.addPort(value, 'source');

			j('#sourcePortBlock form')[0].reset();
			Solera.Layout.remakeTupleList('sourcePort');
		});

		j('#destinationAddressBlock input[name=add]').click(function () {
			var value, result;

			Solera.Logger.log('Adding new destination address to tuple list');

			value = j('#destinationAddressBlock input[name=destinationAddress]').val();
			result = Solera.Tuple.addAddress(value, 'destination');

			j('#destinationAddressBlock form')[0].reset();
			Solera.Layout.remakeTupleList('destinationAddress');
		});

		j('#destinationPortBlock input[name=add]').click(function () {
			var value, result;

			Solera.Logger.log('Adding new destination port and protocol to tuple list');

			value = j('#destinationPortBlock input[name=destinationPort]').val();
			result = Solera.Tuple.addPort(value, 'destination');

			j('#destinationPortBlock form')[0].reset();

			Solera.Logger.log('Remaking destination port list');
			Solera.Layout.remakeTupleList('destinationPort');
		});
	},

	initializeSubmitButtonHandlers: function () {
		j('#btnDeepSee').click(function () {
			var url;

			Solera.Logger.log('Clicked on DeepSee button');

			url = Solera.Util.getDeepSeeUrl();
			Solera.Logger.log(url);
			window.open(url, "_blank");
		});

		j('#btnPcap').click(function () {
			var url;

			Solera.Logger.log('Clicked on PCAP button');

			url = Solera.Util.getPcapUrl();
			Solera.Logger.log(url);
			window.open(url, "_blank");
		});
	},

	initializeRemoveHandlers: function () {
		j('.tupleList .remove').unbind('click');

		j('#sourceAddressBlock .tupleList .remove').click(function () {
			var content;

			content = j(this).parents('tr').find('.content').find('input[name="addr"]').val();
			if (Solera.Util.isIPv6(content)) {
				Solera.Tuple.removeAddress(content, '6', 'source');
			} else if (Solera.Util.isIPv4(content)) {
				Solera.Tuple.removeAddress(content, '4', 'source');
			} else {
				return;
			}
			Solera.Layout.remakeTupleList('sourceAddress');
		});

		j('#sourcePortBlock .tupleList .remove').click(function () {
			var port;

			port = j(this).parents('tr').find('.content').html();

			Solera.Tuple.removePort(port, 'source');
			Solera.Layout.remakeTupleList('sourcePort');
		});

		j('#destinationAddressBlock .tupleList .remove').click(function () {
			var content;

			content = j(this).parents('tr').find('.content').find('input[name=addr]').val();
			if (Solera.Util.isIPv6(content)) {
				Solera.Tuple.removeAddress(content, '6', 'destination');
			} else if (Solera.Util.isIPv4(content)) {
				Solera.Tuple.removeAddress(content, '4', 'destination');
			} else {
				return;
			}
			Solera.Layout.remakeTupleList('destinationAddress');
		});

		j('#destinationPortBlock .tupleList .remove').click(function () {
			var port;

			port = j(this).parents('tr').find('.content').html();

			Solera.Tuple.removePort(port, 'destination');
			Solera.Layout.remakeTupleList('destinationPort');
		});
	},

	remakeTupleList: function (type) {
		var content;

		Solera.Logger.log('Switching based on tuple type specified; ' + type);

		switch (type) {
		case 'sourceAddress':
			content = Solera.TupleLayout.getSourceAddressList();
			j('#sourceAddressBlock .content').html('');
			j('#sourceAddressBlock .content').html(content);
			this.positionSourceAddressMenu();
			this.initializeRemoveHandlers();
			break;
		case 'sourcePort':
			content = Solera.TupleLayout.getSourcePortList();
			j('#sourcePortBlock .content').html('');
			j('#sourcePortBlock .content').html(content);
			this.positionSourcePortMenu();
			this.initializeRemoveHandlers();
			break;
		case 'destinationAddress':
			content = Solera.TupleLayout.getDestinationAddressList();
			j('#destinationAddressBlock .content').html('');
			j('#destinationAddressBlock .content').html(content);
			this.positionDestinationAddressMenu();
			this.initializeRemoveHandlers();
			break;
		case 'destinationPort':
			content = Solera.TupleLayout.getDestinationPortList();
			j('#destinationPortBlock .content').html('');
			j('#destinationPortBlock .content').html(content);
			this.positionDestinationPortMenu();
			this.initializeRemoveHandlers();
			break;
		}
	},

	positionTupleSubmenu: function (menuItem) {
		switch(menuItem) {
		case '#timespanBlock':
			this.positionTimespanMenu();
			break;
		case '#sourceAddressBlock':
			this.positionSourceAddressMenu();
			break;
		case '#sourcePortBlock':
			this.positionSourcePortMenu();
			break;
		case '#destinationAddressBlock':
			this.positionDestinationAddressMenu();
			break;
		case '#destinationPortBlock':
			this.positionDestinationPortMenu();
			break;
		case '#protocolBlock':
			this.positionProtocolMenu();
			break;
		case '#soleraBlock':
			this.positionSoleraMenu();
			break;
		}
	},

	hideTupleSubmenus: function () {
		j('#timespanBlock, #sourceAddressBlock, #sourcePortBlock').hide();
		j('#soleraBlock, #destinationAddressBlock, #destinationPortBlock').hide();
		j('#protocolBlock').hide();
	},

	positionTimespanMenu: function () {
		j('#timespanBlock').position({
			of: j('#timespanButton'),
			my: 'left bottom',
			at: 'left top',
			offset: 0
		});
	},

	positionSourceAddressMenu: function () {
		j('#sourceAddressBlock').position({
			of: j('#sourceAddressButton'),
			my: 'left bottom',
			at: 'left top',
			offset: 0
		});
	},

	positionSourcePortMenu: function () {
		j('#sourcePortBlock').position({
			of: j('#sourcePortButton'),
			my: 'left bottom',
			at: 'left top',
			offset: 0
		});
	},

	positionDestinationAddressMenu: function () {
		j('#destinationAddressBlock').position({
			of: j('#destinationAddressButton'),
			my: 'center bottom',
			at: 'center top',
			offset: 0
		});
	},

	positionDestinationPortMenu: function () {
		j('#destinationPortBlock').position({
			of: j('#destinationPortButton'),
			my: 'right bottom',
			at: 'right top',
			offset: 0
		});
	},

	positionProtocolMenu: function () {
		j('#protocolBlock').position({
			of: j('#protocolButton'),
			my: 'right bottom',
			at: 'right top',
			offset: 0
		});
	},

	positionSoleraMenu: function () {
		j('#soleraBlock').position({
			of: j('#soleraButton'),
			my: 'right bottom',
			at: 'right top',
			offset: 0
		});
	},

	maximizeBar: function () {
		j('#carbonRod').show();
		j('#soleraRodPlaceholder').hide();
		j('#soleraHeightImage').attr('src', globalImageSrc.minimizeSrc);
		j('#soleraHeightImage').attr('title', 'Minimize the Solera bar');
		j('#soleraHeightImage').attr('alt', 'Minimize the Solera bar');
		j('#soleraHeightImage').removeClass();
		j('#soleraHeightImage').addClass('maximize');

		j('#soleraHeightImage').unbind('click');
		j('#soleraHeightImage').click(function () {
			Solera.Layout.minimizeBar();
		});
	},

	minimizeBar: function () {
		j('#carbonRod').hide();
		j('#soleraRodPlaceholder').show();
		j('#soleraHeightImage').attr('src', globalImageSrc.maximizeSrc);
		j('#soleraHeightImage').attr('title', 'Maximize the Solera bar');
		j('#soleraHeightImage').attr('alt', 'Maximize the Solera bar');
		j('#soleraHeightImage').removeClass();
		j('#soleraHeightImage').addClass('minimize');

		j('#soleraHeightImage').unbind('click');
		j('#soleraHeightImage').click(function () {
			Solera.Layout.maximizeBar();
		});
	}
};
