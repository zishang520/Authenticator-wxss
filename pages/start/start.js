/*jshint esversion: 6 */
const app = getApp();

let luoyy = require('../../utils/index.js'),
    API = require('../../utils/Cloud.js').Cloud(),
    lang = require("./lang.js").default;

Page({
    /**
     * 页面的初始数据
     */
    data: {
        lang: lang[app.globalData.language]
    },
    openScan: function() {
        // 允许从相机和相册扫码
        wx.scanCode({
            success: (res) => {
                var d = luoyy.parseQrcode(res.result);
                if (d === false) {
                    return wx.reLaunch({
                        url: '/pages/index/index?ErrorModal=1'
                    });
                }
                API.Config_inserts(d);
                return wx.reLaunch({
                    url: '/pages/index/index?FirstAdd=1'
                });
            }
        });
    },
    gotoInput: function() {
        wx.navigateTo({
            url: '/pages/input/input?FirstAdd=1'
        });
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