function t(t){if(t>Z)throw new RangeError("Invalid typed array length");var e=new Uint8Array(t);return e.__proto__=r.prototype,e}function r(t,r,n){if("number"==typeof t){if("string"==typeof r)throw new Error("If encoding is specified then the first argument must be a string");return o(t)}return e(t,r,n)}function e(t,r,e){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return q(t)?f(t,r,e):"string"==typeof t?u(t,r):h(t)}function n(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function i(r,e,i){return n(r),r<=0?t(r):void 0!==e?"string"==typeof i?t(r).fill(e,i):t(r).fill(e):t(r)}function o(r){return n(r),t(r<0?0:0|a(r))}function u(e,n){if("string"==typeof n&&""!==n||(n="utf8"),!r.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var i=0|l(e,n),o=t(i),u=o.write(e,n);return u!==i&&(o=o.slice(0,u)),o}function s(r){for(var e=r.length<0?0:0|a(r.length),n=t(e),i=0;i<e;i+=1)n[i]=255&r[i];return n}function f(t,e,n){if(e<0||t.byteLength<e)throw new RangeError("'offset' is out of bounds");if(t.byteLength<e+(n||0))throw new RangeError("'length' is out of bounds");var i;return i=void 0===e&&void 0===n?new Uint8Array(t):void 0===n?new Uint8Array(t,e):new Uint8Array(t,e,n),i.__proto__=r.prototype,i}function h(e){if(r.isBuffer(e)){var n=0|a(e.length),i=t(n);return 0===i.length?i:(e.copy(i,0,0,n),i)}if(e){if(N(e)||"length"in e)return"number"!=typeof e.length||V(e.length)?t(0):s(e);if("Buffer"===e.type&&Array.isArray(e.data))return s(e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function a(t){if(t>=Z)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Z.toString(16)+" bytes");return 0|t}function c(t){return+t!=t&&(t=0),r.alloc(+t)}function l(t,e){if(r.isBuffer(t))return t.length;if(N(t)||q(t))return t.byteLength;"string"!=typeof t&&(t=""+t);var n=t.length;if(0===n)return 0;for(var i=!1;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return z(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return Y(t).length;default:if(i)return z(t).length;e=(""+e).toLowerCase(),i=!0}}function p(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return"";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return"";if(e>>>=0,r>>>=0,e<=r)return"";for(t||(t="utf8");;)switch(t){case"hex":return x(this,r,e);case"utf8":case"utf-8":return I(this,r,e);case"ascii":return U(this,r,e);case"latin1":case"binary":return S(this,r,e);case"base64":return A(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return L(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function g(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function y(t,e,n,i,o){if(0===t.length)return-1;if("string"==typeof n?(i=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,V(n)&&(n=o?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(o)return-1;n=t.length-1}else if(n<0){if(!o)return-1;n=0}if("string"==typeof e&&(e=r.from(e,i)),r.isBuffer(e))return 0===e.length?-1:w(t,e,n,i,o);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):w(t,[e],n,i,o);throw new TypeError("val must be string, number or Buffer")}function w(t,r,e,n,i){function o(t,r){return 1===u?t[r]:t.readUInt16BE(r*u)}var u=1,s=t.length,f=r.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return-1;u=2,s/=2,f/=2,e/=2}var h;if(i){var a=-1;for(h=e;h<s;h++)if(o(t,h)===o(r,a===-1?0:h-a)){if(a===-1&&(a=h),h-a+1===f)return a*u}else a!==-1&&(h-=h-a),a=-1}else for(e+f>s&&(e=s-f),h=e;h>=0;h--){for(var c=!0,l=0;l<f;l++)if(o(t,h+l)!==o(r,l)){c=!1;break}if(c)return h}return-1}function d(t,r,e,n){e=Number(e)||0;var i=t.length-e;n?(n=Number(n))>i&&(n=i):n=i;var o=r.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var u=0;u<n;++u){var s=parseInt(r.substr(2*u,2),16);if(V(s))return u;t[e+u]=s}return u}function v(t,r,e,n){return j(z(r,t.length-e),t,e,n)}function b(t,r,e,n){return j(F(r),t,e,n)}function E(t,r,e,n){return b(t,r,e,n)}function m(t,r,e,n){return j(Y(r),t,e,n)}function B(t,r,e,n){return j(D(r,t.length-e),t,e,n)}function A(t,r,e){return 0===r&&e===t.length?X.fromByteArray(t):X.fromByteArray(t.slice(r,e))}function I(t,r,e){e=Math.min(t.length,e);for(var n=[],i=r;i<e;){var o=t[i],u=null,s=o>239?4:o>223?3:o>191?2:1;if(i+s<=e){var f,h,a,c;switch(s){case 1:o<128&&(u=o);break;case 2:f=t[i+1],128==(192&f)&&(c=(31&o)<<6|63&f)>127&&(u=c);break;case 3:f=t[i+1],h=t[i+2],128==(192&f)&&128==(192&h)&&(c=(15&o)<<12|(63&f)<<6|63&h)>2047&&(c<55296||c>57343)&&(u=c);break;case 4:f=t[i+1],h=t[i+2],a=t[i+3],128==(192&f)&&128==(192&h)&&128==(192&a)&&(c=(15&o)<<18|(63&f)<<12|(63&h)<<6|63&a)>65535&&c<1114112&&(u=c)}}null===u?(u=65533,s=1):u>65535&&(u-=65536,n.push(u>>>10&1023|55296),u=56320|1023&u),n.push(u),i+=s}return _(n)}function _(t){var r=t.length;if(r<=G)return String.fromCharCode.apply(String,t);for(var e="",n=0;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=G));return e}function U(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(127&t[i]);return n}function S(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(t[i]);return n}function x(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var i="",o=r;o<e;++o)i+=P(t[o]);return i}function L(t,r,e){for(var n=t.slice(r,e),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function R(t,r,e){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function T(t,e,n,i,o,u){if(!r.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<u)throw new RangeError('"value" argument is out of bounds');if(n+i>t.length)throw new RangeError("Index out of range")}function C(t,r,e,n,i,o){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function k(t,r,e,n,i){return r=+r,e>>>=0,i||C(t,r,e,4,3.4028234663852886e38,-3.4028234663852886e38),J.write(t,r,e,n,23,4),e+4}function M(t,r,e,n,i){return r=+r,e>>>=0,i||C(t,r,e,8,1.7976931348623157e308,-1.7976931348623157e308),J.write(t,r,e,n,52,8),e+8}function O(t){if(t=t.trim().replace(H,""),t.length<2)return"";for(;t.length%4!=0;)t+="=";return t}function P(t){return t<16?"0"+t.toString(16):t.toString(16)}function z(t,r){r=r||1/0;for(var e,n=t.length,i=null,o=[],u=0;u<n;++u){if((e=t.charCodeAt(u))>55295&&e<57344){if(!i){if(e>56319){(r-=3)>-1&&o.push(239,191,189);continue}if(u+1===n){(r-=3)>-1&&o.push(239,191,189);continue}i=e;continue}if(e<56320){(r-=3)>-1&&o.push(239,191,189),i=e;continue}e=65536+(i-55296<<10|e-56320)}else i&&(r-=3)>-1&&o.push(239,191,189);if(i=null,e<128){if((r-=1)<0)break;o.push(e)}else if(e<2048){if((r-=2)<0)break;o.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;o.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return o}function F(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}function D(t,r){for(var e,n,i,o=[],u=0;u<t.length&&!((r-=2)<0);++u)e=t.charCodeAt(u),n=e>>8,i=e%256,o.push(i),o.push(n);return o}function Y(t){return X.toByteArray(O(t))}function j(t,r,e,n){for(var i=0;i<n&&!(i+e>=r.length||i>=t.length);++i)r[i+e]=t[i];return i}function q(t){return t instanceof ArrayBuffer||null!=t&&null!=t.constructor&&"ArrayBuffer"===t.constructor.name&&"number"==typeof t.byteLength}function N(t){return"function"==typeof ArrayBuffer.isView&&ArrayBuffer.isView(t)}function V(t){return t!==t}var X=require("./base64.js"),J=require("./ieee754.js");exports.SlowBuffer=c,exports.INSPECT_MAX_BYTES=50;var Z=2147483647;exports.kMaxLength=Z,r.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(t){return!1}}(),r.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),"undefined"!=typeof Symbol&&Symbol.species&&r[Symbol.species]===r&&Object.defineProperty(r,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),r.poolSize=8192,r.from=function(t,r,n){return e(t,r,n)},r.prototype.__proto__=Uint8Array.prototype,r.__proto__=Uint8Array,r.alloc=function(t,r,e){return i(t,r,e)},r.allocUnsafe=function(t){return o(t)},r.allocUnsafeSlow=function(t){return o(t)},r.isBuffer=function(t){return null!=t&&t._isBuffer===!0},r.compare=function(t,e){if(!r.isBuffer(t)||!r.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var n=t.length,i=e.length,o=0,u=Math.min(n,i);o<u;++o)if(t[o]!==e[o]){n=t[o],i=e[o];break}return n<i?-1:i<n?1:0},r.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},r.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return r.alloc(0);var n;if(void 0===e)for(e=0,n=0;n<t.length;++n)e+=t[n].length;var i=r.allocUnsafe(e),o=0;for(n=0;n<t.length;++n){var u=t[n];if(!r.isBuffer(u))throw new TypeError('"list" argument must be an Array of Buffers');u.copy(i,o),o+=u.length}return i},r.byteLength=l,r.prototype._isBuffer=!0,r.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)g(this,r,r+1);return this},r.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)g(this,r,r+3),g(this,r+1,r+2);return this},r.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)g(this,r,r+7),g(this,r+1,r+6),g(this,r+2,r+5),g(this,r+3,r+4);return this},r.prototype.toString=function(){var t=this.length;return 0===t?"":0===arguments.length?I(this,0,t):p.apply(this,arguments)},r.prototype.equals=function(t){if(!r.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===r.compare(this,t)},r.prototype.inspect=function(){var t="",r=exports.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},r.prototype.compare=function(t,e,n,i,o){if(!r.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===n&&(n=t?t.length:0),void 0===i&&(i=0),void 0===o&&(o=this.length),e<0||n>t.length||i<0||o>this.length)throw new RangeError("out of range index");if(i>=o&&e>=n)return 0;if(i>=o)return-1;if(e>=n)return 1;if(e>>>=0,n>>>=0,i>>>=0,o>>>=0,this===t)return 0;for(var u=o-i,s=n-e,f=Math.min(u,s),h=this.slice(i,o),a=t.slice(e,n),c=0;c<f;++c)if(h[c]!==a[c]){u=h[c],s=a[c];break}return u<s?-1:s<u?1:0},r.prototype.includes=function(t,r,e){return this.indexOf(t,r,e)!==-1},r.prototype.indexOf=function(t,r,e){return y(this,t,r,e,!0)},r.prototype.lastIndexOf=function(t,r,e){return y(this,t,r,e,!1)},r.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r>>>=0,isFinite(e)?(e>>>=0,void 0===n&&(n="utf8")):(n=e,e=void 0)}var i=this.length-r;if((void 0===e||e>i)&&(e=i),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return d(this,t,r,e);case"utf8":case"utf-8":return v(this,t,r,e);case"ascii":return b(this,t,r,e);case"latin1":case"binary":return E(this,t,r,e);case"base64":return m(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return B(this,t,r,e);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},r.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var G=4096;r.prototype.slice=function(t,e){var n=this.length;t=~~t,e=void 0===e?n:~~e,t<0?(t+=n)<0&&(t=0):t>n&&(t=n),e<0?(e+=n)<0&&(e=0):e>n&&(e=n),e<t&&(e=t);var i=this.subarray(t,e);return i.__proto__=r.prototype,i},r.prototype.readUIntLE=function(t,r,e){t>>>=0,r>>>=0,e||R(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n},r.prototype.readUIntBE=function(t,r,e){t>>>=0,r>>>=0,e||R(t,r,this.length);for(var n=this[t+--r],i=1;r>0&&(i*=256);)n+=this[t+--r]*i;return n},r.prototype.readUInt8=function(t,r){return t>>>=0,r||R(t,1,this.length),this[t]},r.prototype.readUInt16LE=function(t,r){return t>>>=0,r||R(t,2,this.length),this[t]|this[t+1]<<8},r.prototype.readUInt16BE=function(t,r){return t>>>=0,r||R(t,2,this.length),this[t]<<8|this[t+1]},r.prototype.readUInt32LE=function(t,r){return t>>>=0,r||R(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},r.prototype.readUInt32BE=function(t,r){return t>>>=0,r||R(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},r.prototype.readIntLE=function(t,r,e){t>>>=0,r>>>=0,e||R(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*r)),n},r.prototype.readIntBE=function(t,r,e){t>>>=0,r>>>=0,e||R(t,r,this.length);for(var n=r,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*r)),o},r.prototype.readInt8=function(t,r){return t>>>=0,r||R(t,1,this.length),128&this[t]?(255-this[t]+1)*-1:this[t]},r.prototype.readInt16LE=function(t,r){t>>>=0,r||R(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},r.prototype.readInt16BE=function(t,r){t>>>=0,r||R(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},r.prototype.readInt32LE=function(t,r){return t>>>=0,r||R(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},r.prototype.readInt32BE=function(t,r){return t>>>=0,r||R(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},r.prototype.readFloatLE=function(t,r){return t>>>=0,r||R(t,4,this.length),J.read(this,t,!0,23,4)},r.prototype.readFloatBE=function(t,r){return t>>>=0,r||R(t,4,this.length),J.read(this,t,!1,23,4)},r.prototype.readDoubleLE=function(t,r){return t>>>=0,r||R(t,8,this.length),J.read(this,t,!0,52,8)},r.prototype.readDoubleBE=function(t,r){return t>>>=0,r||R(t,8,this.length),J.read(this,t,!1,52,8)},r.prototype.writeUIntLE=function(t,r,e,n){if(t=+t,r>>>=0,e>>>=0,!n){T(this,t,r,e,Math.pow(2,8*e)-1,0)}var i=1,o=0;for(this[r]=255&t;++o<e&&(i*=256);)this[r+o]=t/i&255;return r+e},r.prototype.writeUIntBE=function(t,r,e,n){if(t=+t,r>>>=0,e>>>=0,!n){T(this,t,r,e,Math.pow(2,8*e)-1,0)}var i=e-1,o=1;for(this[r+i]=255&t;--i>=0&&(o*=256);)this[r+i]=t/o&255;return r+e},r.prototype.writeUInt8=function(t,r,e){return t=+t,r>>>=0,e||T(this,t,r,1,255,0),this[r]=255&t,r+1},r.prototype.writeUInt16LE=function(t,r,e){return t=+t,r>>>=0,e||T(this,t,r,2,65535,0),this[r]=255&t,this[r+1]=t>>>8,r+2},r.prototype.writeUInt16BE=function(t,r,e){return t=+t,r>>>=0,e||T(this,t,r,2,65535,0),this[r]=t>>>8,this[r+1]=255&t,r+2},r.prototype.writeUInt32LE=function(t,r,e){return t=+t,r>>>=0,e||T(this,t,r,4,4294967295,0),this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t,r+4},r.prototype.writeUInt32BE=function(t,r,e){return t=+t,r>>>=0,e||T(this,t,r,4,4294967295,0),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},r.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var i=Math.pow(2,8*e-1);T(this,t,r,e,i-1,-i)}var o=0,u=1,s=0;for(this[r]=255&t;++o<e&&(u*=256);)t<0&&0===s&&0!==this[r+o-1]&&(s=1),this[r+o]=(t/u>>0)-s&255;return r+e},r.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var i=Math.pow(2,8*e-1);T(this,t,r,e,i-1,-i)}var o=e-1,u=1,s=0;for(this[r+o]=255&t;--o>=0&&(u*=256);)t<0&&0===s&&0!==this[r+o+1]&&(s=1),this[r+o]=(t/u>>0)-s&255;return r+e},r.prototype.writeInt8=function(t,r,e){return t=+t,r>>>=0,e||T(this,t,r,1,127,-128),t<0&&(t=255+t+1),this[r]=255&t,r+1},r.prototype.writeInt16LE=function(t,r,e){return t=+t,r>>>=0,e||T(this,t,r,2,32767,-32768),this[r]=255&t,this[r+1]=t>>>8,r+2},r.prototype.writeInt16BE=function(t,r,e){return t=+t,r>>>=0,e||T(this,t,r,2,32767,-32768),this[r]=t>>>8,this[r+1]=255&t,r+2},r.prototype.writeInt32LE=function(t,r,e){return t=+t,r>>>=0,e||T(this,t,r,4,2147483647,-2147483648),this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24,r+4},r.prototype.writeInt32BE=function(t,r,e){return t=+t,r>>>=0,e||T(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},r.prototype.writeFloatLE=function(t,r,e){return k(this,t,r,!0,e)},r.prototype.writeFloatBE=function(t,r,e){return k(this,t,r,!1,e)},r.prototype.writeDoubleLE=function(t,r,e){return M(this,t,r,!0,e)},r.prototype.writeDoubleBE=function(t,r,e){return M(this,t,r,!1,e)},r.prototype.copy=function(t,r,e,n){if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var i,o=n-e;if(this===t&&e<r&&r<n)for(i=o-1;i>=0;--i)t[i+r]=this[i+e];else if(o<1e3)for(i=0;i<o;++i)t[i+r]=this[i+e];else Uint8Array.prototype.set.call(t,this.subarray(e,e+o),r);return o},r.prototype.fill=function(t,e,n,i){if("string"==typeof t){if("string"==typeof e?(i=e,e=0,n=this.length):"string"==typeof n&&(i=n,n=this.length),1===t.length){var o=t.charCodeAt(0);o<256&&(t=o)}if(void 0!==i&&"string"!=typeof i)throw new TypeError("encoding must be a string");if("string"==typeof i&&!r.isEncoding(i))throw new TypeError("Unknown encoding: "+i)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;e>>>=0,n=void 0===n?this.length:n>>>0,t||(t=0);var u;if("number"==typeof t)for(u=e;u<n;++u)this[u]=t;else{var s=r.isBuffer(t)?t:new r(t,i),f=s.length;for(u=0;u<n-e;++u)this[u+e]=s[u%f]}return this};var H=/[^+\/0-9A-Za-z-_]/g;module.exports=r;