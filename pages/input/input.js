/*jshint esversion: 6 */
const app = getApp();

let luoyy = require('../../utils/index.js'),
    API = require('../../utils/Cloud.js').Cloud(),
    lang = require("./lang.js").default;

Page({
    data: {
        usernamefocus: false,
        usernameinput: false,
        tokenerror: false,
        tokenfocus: false,
        tokeninput: false,
        errorMsg: lang[app.globalData.language].ks,
        uri: {},
        index: 0,
        lang: lang[app.globalData.language],
        options: [{
            id: 0,
            name: lang[app.globalData.language].bat
        }, {
            id: 1,
            name: lang[app.globalData.language].batc
        }]
    },

    change(e) {
        this.setData({
            index: e.detail.id
        })
    },

    closeSelect() {
        // 关闭select
        this.selectComponent('#select').close()
    },

    onLoad: function(uri) {
        this.data.uri = uri;
    },

    Inputfocus: function(e) {
        this.setData({
            [e.target.id + 'focus']: true
        });
    },
    Inputblur: function(e) {
        this.setData({
            [e.target.id + 'focus']: false
        });
    },
    Inputinput: function(e) {
        if (e.target.id == 'token') {
            if (e.detail.value.length > 0 && !(/^[A-Za-z0-7\-\s]+($|=+$)/).test(e.detail.value)) {
                this.setData({
                    errorMsg: lang[app.globalData.language].ke
                });
                if (!this.data[e.target.id + 'error']) {
                    this.setData({
                        [e.target.id + 'error']: true
                    });
                }
            } else {
                if (this.data[e.target.id + 'error']) {
                    this.setData({
                        [e.target.id + 'error']: false
                    });
                }
            }
        }
        if (e.detail.value.length > 0) {
            if (!this.data[e.target.id + 'input']) {
                this.setData({
                    [e.target.id + 'input']: true
                });
            }
        } else {
            if (this.data[e.target.id + 'input']) {
                this.setData({
                    [e.target.id + 'input']: false
                });
            }
        }
    },
    formSubmit: function(e) {
        let data = e.detail.value;
        if (this.data.tokenerror) {
            return false;
        }
        let token = data.token.replace(/\s/ig, '');
        if (token.length < 16) {
            return this.setData({
                tokeninput: true,
                errorMsg: lang[app.globalData.language].ks,
                tokenerror: true
            });
        }
        API.Config_insert({
            secret: token,
            counter: ((data.type >> 0) === 0) ? undefined : 0,
            encoding: "base32",
            algorithm: "SHA1",
            issuer: '',
            digits: 6,
            epoch: 0,
            step: 30,
            type: ((data.type >> 0) === 0) ? "totp" : 'hotp',
            label: data.username,
        });
        return wx.reLaunch({
            url: '/pages/index/index?' + luoyy.http_build_query(this.data.uri)
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.lang.shareTitle,
            path: '/pages/index/index',
            imageUrl: '/images/share.png'
        }
    },
    onAddToFavorites: function() {
        return {
            title: this.data.lang.shareTitle,
            imageUrl: '/images/share.png'
        }
    }
});