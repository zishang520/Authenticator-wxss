/*jshint esversion: 6 */
let API = require('./utils/Cloud.js').Cloud();

App({
    Config: API.Config_get(),
    globalData: {
        language: 'zh_CN',
        LaunchOptions: {},
    },
    onLaunch: function(launchOptions) {
        const system = wx.getSystemInfoSync();

        this.globalData.LaunchOptions = launchOptions;
        this._initLanguage(system);
        this._initBar(system);
        this._checkVersion(system);
    },
    _initLanguage: function(system) {
        switch (system.language) {
            case 'zh_TW':
                this.globalData.language = 'zh_HK';
                break;
            case 'en':
            case 'zh_CN':
            case 'zh_HK':
                this.globalData.language = system.language;
                break;
            default:
                this.globalData.language = 'en';
                break;
        }
    },

    _initBar: function(system) {
        this.globalData.StatusBar = system.statusBarHeight;

        const custom = (() => {
            const default_rect = {
                width: 87,
                height: 32,
                left: system.safeArea.width - 87 - 10,
                top: system.statusBarHeight + 4,
                right: system.safeArea.width - 10,
                bottom: system.statusBarHeight + 6 + 32
            };
            try {
                return wx.getMenuButtonBoundingClientRect() || default_rect;
            } catch (e) {
                return default_rect;
            }
        })();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - system.statusBarHeight;
    },

    _checkVersion: function(system) {
        if (this.compareVersion(system.SDKVersion, '2.20.1') < 0) {
            wx.redirectTo({
                url: '/pages/errors/505/505'
            });
        } else {
            // 全部不准截图
            wx.setVisualEffectOnCapture({
                visualEffect: 'hidden',
                success: (res) => {},
                fail: (err) => {},
                complete: (res) => {}
            });
        }
    },

    onPageNotFound: function(res) {
        wx.redirectTo({
            url: '/pages/index/index'
        });
    },
    getDataLength: function() {
        return Object.keys(this.Config).length;
    },
    compareVersion: function(v1, v2) {
        v1 = v1.split('.');
        v2 = v2.split('.');
        const len = Math.max(v1.length, v2.length);
        while (v1.length < len) {
            v1.push('0');
        }
        while (v2.length < len) {
            v2.push('0');
        }
        for (let i = 0; i < len; i++) {
            const num1 = parseInt(v1[i], 10);
            const num2 = parseInt(v2[i], 10);
            if (num1 > num2) {
                return 1;
            } else if (num1 < num2) {
                return -1;
            }
        }
        return 0;
    }
});