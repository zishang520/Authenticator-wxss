/*jshint esversion: 6 */

exports.parseQrcode = function(e) {
    try {
        let r = url.parse(e, !0);
        if (!(exports.isset(r))) {
            return !1;
        }
        if (!('protocol' in r) || !(exports.isset(r.protocol))) {
            return !1;
        }
        if (!('query' in r) || !(exports.isset(r.query))) {
            return !1;
        }
        if (!('hostname' in r) || !(exports.isset(r.hostname))) {
            return !1;
        }
        switch (r.protocol.toLowerCase()) {
            case 'otpauth:':
                return exports.parseURL(r);
            case 'otpauth-migration:':
                return !1;
            default:
                return !1;
        }

    } catch (exception) {
        return !1;
    }
}

exports.parseURL = function(r) {
    try {

        switch (r.hostname.toLowerCase()) {
            case 'hotp':
            case 'totp':
                break;
            default:
                return !1;
                // break;
        }

        if (!('pathname' in r) || !(exports.isset(r.pathname))) {
            return !1;
        }

        let t = r.pathname.substr(1).split(":"),
            s = Object.assign({
                secret: '',
                encoding: "base32",
                algorithm: "SHA1",
                counter: undefined,
                issuer: '',
                type: "totp",
                digits: 6,
                epoch: 0,
                step: 30,
                label: '',
                is_delete: false
            }, r.query);

        if (s.secret.length === 0) {
            return !1;
        }
        s.type = r.hostname.toLowerCase();
        s.counter = ((s.type == 'totp') ? undefined : 0);
        if (s.label.length === 0) {
            s.label = decodeURIComponent(((t.length == 1) ? t[0] : t[1]));
        }
        if (s.issuer.length === 0 && t.length > 1) {
            s.issuer = decodeURIComponent(t[0]);
        }
        if ('period' in s) {
            s.step = parseInt(s.period, 10);
            delete s.period;
        }
        s.digits = parseInt(s.digits, 10);
        s.step = parseInt(s.step, 10);
        s.epoch = parseInt(s.epoch, 10);
        return [s];
    } catch (exception) {
        return !1;
    }
};

exports.http_build_query = function http_build_query(formdata, numericPrefix, argSeparator) {
    let urlencode = function(str) {
            str = (str + '');
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
        },
        value, key, tmp = [],
        _httpBuildQueryHelper = function(key, val, argSeparator) {
            let k, tmp = [];
            if (val === true) {
                val = '1';
            } else if (val === false) {
                val = '0';
            }
            if (val !== null) {
                if (typeof val === 'object') {
                    for (k in val) {
                        if (val[k] !== null) {
                            tmp.push(_httpBuildQueryHelper(key + '[' + k + ']', val[k], argSeparator));
                        }
                    }
                    return tmp.join(argSeparator);
                } else if (typeof val !== 'function') {
                    return urlencode(key) + '=' + urlencode(val);
                } else {
                    throw new Error('There was an error processing for http_build_query().');
                }
            } else {
                return '';
            }
        };

    if (!argSeparator) {
        argSeparator = '&';
    }
    for (key in formdata) {
        value = formdata[key];
        if (numericPrefix && !isNaN(key)) {
            key = String(numericPrefix) + key;
        }
        let query = _httpBuildQueryHelper(key, value, argSeparator);
        if (query !== '') {
            tmp.push(query);
        }
    }

    return tmp.join(argSeparator);
};

exports.isset = function isset(vars) {
    return (vars !== null) && (vars !== undefined);
};

let url = require("./url.js"),
    Buffer = require('./Buffer.js'),
    base32 = require('./base32.js');
