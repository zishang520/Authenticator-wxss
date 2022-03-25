/*jshint esversion: 6 */
const app = getApp();
let luoyy = require('../../utils/index.js'),
    lang = require("./lang.js").default;
Page({
    data: {
        help_current: 0,
        is_back: false,
        CustomBar: app.globalData.CustomBar,
        lang: lang[app.globalData.language]
    },
    onLoad: function(uri) {
        if (luoyy.isset(uri) && luoyy.isset(uri.is_back)) {
            this.setData({
                is_back: true,
            });
        }
        this.setData({
            help_current: 0
        });
    },
    Swiperchange(event) {
        this.setData({
            help_current: event.detail.current
        });
    },
    toNext() {
        this.setData({
            help_current: this.data.help_current + 1
        });
    },
    toJump() {
        if (this.data.is_back) {
            wx.navigateBack();
        } else {
            wx.redirectTo({
                url: '/pages/start/start',
                complete: () => {
                    wx.setStorageSync('startOK', true);
                }
            });
        }
    },
    onShareAppMessage: function() {
        return {
            title: this.data.lang['shareTitle'],
            path: '/pages/index/index',
            imageUrl: '/images/share.png'
        }
    },
    onAddToFavorites: function() {
        return {
            title: this.data.lang['shareTitle'],
            imageUrl: '/images/share.png'
        }
    }
});