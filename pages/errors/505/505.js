/*jshint esversion: 6 */
const app = getApp();

let lang = require("./lang.js").default;
Page({
    data: {
        CustomBar: app.globalData.CustomBar,
        lang: lang[app.globalData.language]
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