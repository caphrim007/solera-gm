/*jslint browser: true, devel: true, cap: false, maxerr: 65535*/
/*global window, $*/
/* vim: set ts=4:sw=4:sts=4smarttab:expandtab:autoindent */

/**
* jQuery Spin 1.1.1
*
* Fixes added by Tim to handle weirdness that happens
* with $(this) and variable scope.
*
* @author Naohiko Mori
* @author Tim Rupp <caphrim007@gmail.com>
* @copyright 2009
* @license MIT
* @license GPL
*/
(function(j){
try {
	var calcFloat = {
		get: function(num){
			var num, nn, po, st, sign;

			num = num.toString();
			if(num.indexOf('.') == -1) {
				return[0, eval(num)];
			}
			nn = num.split('.');
			po = nn[1].length;
			st = nn.join('');
			sign = '';
			if(st.charAt(0)=='-'){
				st = st.substr(1);
				sign = '-';
			}
			for(var i = 0; i < st.length; ++i) {
				if(st.charAt(0) == '0') {
					st = st.substr(1, st.length);
				}
			}
			st = sign + st;
			return [po, eval(st)];
		},

		getInt: function(num, figure) {
			var d, n, v1, v2;

			d = Math.pow(10, figure);
			n = this.get(num);
			v1 = eval('num * d');
			v2 = eval('n[1] * d');

			if(this.get(v1)[1]==v2) {
				return v1;
			}

			return (n[0]==0 ? v1 : eval(v2 + '/Math.pow(10, n[0])'));
		},

		sum: function(v1, v2) {
			var n1, n2, figure;

			n1 = this.get(v1);
			n2 = this.get(v2);
			figure = (n1[0] > n2[0] ? n1[0] : n2[0]);
			v1 = this.getInt(v1, figure);
			v2 = this.getInt(v2, figure);
			return eval('v1 + v2')/Math.pow(10, figure);
		}
	};

	j.extend({
		spin: {
			imageBasePath: '',
			spinBtnImage: '',
			spinUpImage: '',
			spinDownImage: '',
			interval: 1,
			max: null,
			min: null,
			timeInterval: 500,
			timeBlink: 200,
			btnClass: null,
			btnCss: {cursor: 'pointer', padding: 0, margin: 0, verticalAlign: 'middle'},
			txtCss: {marginRight: 0, paddingRight: 0},
			lock: false,
			decimal: null,
			beforeChange: null,
			changed: null,
			buttonUp: null,
			buttonDown: null,
			padZero: false,
			padSpaces: 2
		}
	});

	j.fn.extend({
		spin: function(o){
			return this.each(function() {
				var opt, txt, spinBtnImage, btnSpin, spinUpImage,
				    btnSpinUp, spinDownImage, btnSpinDown, btn;

				o = o || {};
				opt = {};
				j.each(j.spin, function(k,v){
					opt[k] = (typeof o[k]!='undefined' ? o[k] : v);
				});

				txt = j(this);

				spinBtnImage = globalImageSrc.spinBtnImageSrc;
				spinUpImage = globalImageSrc.spinUpImageSrc;
				spinDownImage = globalImageSrc.spinDownImageSrc;

				btnSpin = new Image();
				btnSpin.src = spinBtnImage;
				btnSpinUp = new Image();
				btnSpinUp.src = spinUpImage;
				btnSpinDown = new Image();
				btnSpinDown.src = spinDownImage;

				btn = j(document.createElement('img'));
				btn.attr('src', spinBtnImage);

				if(opt.btnClass) {
					btn.addClass(opt.btnClass);
				}

				if(opt.btnCss) {
					btn.css(opt.btnCss);
				}

				if(opt.txtCss) {
					txt.css(opt.txtCss);
				}

				txt.after(btn);

				if(opt.lock) {
					txt.focus(function(){txt.blur();});
				}

				function spin(vector) {
					var val, org_val, ret, diffLen, padStr, padValStr;

					val = txt.val();
					org_val = val;
					if(opt.decimal) {
						val = val.replace(opt.decimal, '.');
					}

					if(!isNaN(val)) {
						val = calcFloat.sum(val, vector * opt.interval);
						if(opt.min !== null && val < opt.min) {
							val = opt.max;
						}

						if(opt.max !== null && val > opt.max) {
							val = opt.min;
						}

						if(val != txt.val()){
							if(opt.decimal) {
								val = val.toString().replace('.', opt.decimal);
							}

							ret = (j.isFunction(opt.beforeChange) ? opt.beforeChange.apply(txt, [val, org_val]) : true);
							if(ret !== false){
								if (opt.padZero == true) {
									diffLen = opt.padSpaces - val.toString().length;
									padStr = "";
									for (var k = 0; k < diffLen; k++) {
										padStr += "0";
									}

									padValStr = padStr + val.toString();
									j('#' + txt.attr('id')).val(padValStr);
									txt.val(padValStr);
								} else {
									j('#' + txt.attr('id')).val(val);
									txt.val(val);
								}

								if(j.isFunction(opt.changed)) {
									opt.changed.apply(txt, [val]);
								}

								txt.change();
								src = (vector > 0 ? spinUpImage : spinDownImage);
								btn.attr('src', src);

								if(opt.timeBlink < opt.timeInterval) {
									setTimeout(function () {
										btn.attr('src', spinBtnImage);
									}, opt.timeBlink);
								}
							}
						}
					}

					if(vector > 0) {
						if(j.isFunction(opt.buttonUp)) {
							opt.buttonUp.apply(txt, [val]);
						}
					} else {
						if(j.isFunction(opt.buttonDown)) {
							opt.buttonDown.apply(txt, [val]);
						}
					}
				}

				btn.mousedown(function(e) {
					var pos, vector, mBtn;

					pos = e.pageY - j(this).offset().top;
					vector = (j(this).height()/2 > pos ? 1 : -1);
					mBtn = j(this);

					(function () {
						var tk;
						spin(vector);
						tk = setTimeout(arguments.callee, opt.timeInterval);
						j(document).one('mouseup', function () {
							clearTimeout(tk); mBtn.attr('src', spinBtnImage);
						});
					})();

					return false;
				});
			});
		}
	});
} catch (err) {
	console.log(err);
}

})(jQuery);
