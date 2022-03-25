/*jshint esversion: 6 */
const app = getApp();
let luoyy = require('../../utils/index.js'),
    API = require('../../utils/Cloud.js').Cloud(),
    Ga = require("../../utils/Gauth.js"),
    Interval,
    TEMP_TOKENS = app.Config,
    tmp_data = {},
    lang = require("./lang.js").default,
    singlePage = (app.globalData.LaunchOptions.scene == 1154);
Page({
    /**
     * 页面的初始数据
     */
    data: {
        CustomBar: app.globalData.CustomBar,
        DATA: {},
        DATA_length: singlePage ? 0 : app.getDataLength(),
        DeleteModal: true,
        ErrorModal: true,
        singlePageModal: true,
        FirstAdd: false,
        MessageModal: true,
        RenameModal: true,
        InfoModal: true,
        Panel: true,
        deleteid: null,
        deleteinfo: '',
        reid: null,
        rename: '',
        model_id: null,
        model_access: '',
        model_label: '',
        type: '',
        lang: lang[app.globalData.language]
    },
    onLoad: function(uri) {
        if (singlePage) {
            return;
        }
        if (luoyy.isset(uri)) {
            if (luoyy.isset(uri.ErrorModal)) {
                this.setData({
                    ErrorModal: false,
                });
            } else if (luoyy.isset(uri.FirstAdd)) {
                this.setData({
                    FirstAdd: true,
                });
            }
        }
        // this.showCode();
    },
    onShow: function() {
        if (singlePage) {
            return;
        }
        if (this.showCode(true)) {
            this.runCron();
        }
    },
    onHide: function() {
        this.stopCron();
        // this.addAccount(); // 隐藏
    },
    onUnload: function() {
        this.stopCron();
        // this.addAccount(); // 隐藏
    },
    showCode: function(reload) {
        reload = reload || false;
        if (reload) {
            TEMP_TOKENS = API.Config_get();
        }
        if (Object.keys(TEMP_TOKENS).length === 0) {
            return false;
        }
        tmp_data = {};
        try {
            let now_time = (Date.now() / 1000) >> 0;
            for (let id in TEMP_TOKENS) {
                if (('is_delete' in TEMP_TOKENS[id]) && (TEMP_TOKENS[id].is_delete === true)) {
                    continue;
                }
                let p_mod = (now_time + 1) % TEMP_TOKENS[id].step;
                let percent = (p_mod == 0 ? TEMP_TOKENS[id].step : p_mod) / TEMP_TOKENS[id].step;
                tmp_data[id] = {
                    id: id,
                    issuer: TEMP_TOKENS[id].issuer,
                    access: (TEMP_TOKENS[id].label.length > 0 && TEMP_TOKENS[id].issuer.length > 0) ? (TEMP_TOKENS[id].issuer + " (" + TEMP_TOKENS[id].label + ")") : TEMP_TOKENS[id].label,
                    access1: (TEMP_TOKENS[id].label.length > 0 && TEMP_TOKENS[id].issuer.length > 0) ? (TEMP_TOKENS[id].issuer + ":" + TEMP_TOKENS[id].label) : TEMP_TOKENS[id].label,
                    label: TEMP_TOKENS[id].label,
                    step: TEMP_TOKENS[id].step,
                    token: (((now_time % TEMP_TOKENS[id].step) === 0) || (!(id in this.data.DATA)) || reload) ? String((("hotp" == TEMP_TOKENS[id].type) ? (TEMP_TOKENS[id].current_show ? Ga.hotp(TEMP_TOKENS[id]) : '- - - - - -') : Ga.totp(TEMP_TOKENS[id]))).match(/.{1,3}/g).join(' ').replace(/\s{2}/g, ' ') : this.data.DATA[id].token,
                    type: TEMP_TOKENS[id].type,
                    htop_ok: TEMP_TOKENS[id].current_show ? (TEMP_TOKENS[id].current_time + 5 <= now_time) : true,
                    // timer: ("totp" == TEMP_TOKENS[id].type) ? over : 0,
                    percent: Math.round(percent * 100),
                    deg: 360 * percent,
                };
            }
        } catch (e) {
            tmp_data = {};
        }
        let data_length = Object.keys(tmp_data).length;
        this.setData({
            DATA: tmp_data,
            DATA_length: data_length
        });
        if (data_length === 0) {
            return false;
        }
        return true;
    },
    getHotp: function(event) {
        let id = event.currentTarget.dataset.id;
        tmp_data = this.data.DATA;
        try {
            if ((id in tmp_data) && (id in TEMP_TOKENS)) {
                API.Config_valupdate(id, 'counter', ++TEMP_TOKENS[id].counter);
                TEMP_TOKENS[id].current_show = true;
                TEMP_TOKENS[id].current_time = (Date.now() / 1000) >> 0;
                tmp_data[id].token = String(Ga.hotp(TEMP_TOKENS[id])).match(/.{1,3}/g).join(' ');
                tmp_data[id].htop_ok = false;
            }
        } catch (e) {
            // tmp_data = this.data.DATA;
        }
        let data_length = Object.keys(tmp_data).length;
        this.setData({
            DATA: tmp_data,
            DATA_length: data_length
        });
        if (data_length === 0) {
            return false;
        }
        return true;
    },

    runCron: function() {
        return Interval || (Interval = setInterval(() => {
            if (!this.showCode()) {
                this.stopCron();
            }
        }, 1000));
    },
    stopCron: function() {
        return Interval && clearInterval(Interval), (Interval = undefined);
    },
    showWidget: function() {
        return this.setData({
            Panel: false,
        });
    },
    addAccount: function() {
        this.setData({
            FirstAdd: false,
        });
    },
    openScan: function() {
        this.setData({
            Panel: true,
        });
        // 允许从相机和相册扫码
        wx.scanCode({
            success: (res) => {
                var d = luoyy.parseQrcode(res.result);
                if (d === false) {
                    return this.setData({
                        ErrorModal: false,
                    });
                }
                API.Config_inserts(d);
                TEMP_TOKENS = API.Config_get();
                this.showCode(true);
            }
        });
    },
    gotoInput: function() {
        this.setData({
            Panel: true,
        });
        wx.navigateTo({
            url: '/pages/input/input',
        });
    },
    Longpress: function(event) {
        wx.vibrateShort();
        this.setData({
            MessageModal: false,
            model_id: event.currentTarget.dataset.id,
            model_label: event.currentTarget.dataset.label,
            model_access: event.currentTarget.dataset.access,
            type: event.currentTarget.dataset.type,
        });
    },
    editActionSheet: function(event) {
        this.setData({
            MessageModal: true,
            model_id: null,
            model_access: '',
            model_label: '',
            type: '',
            reid: event.currentTarget.dataset.id,
            rename: event.currentTarget.dataset.label,
            RenameModal: false
        });
    },
    deleteActionSheet: function(event) {
        this.data.deleteid = event.currentTarget.dataset.id,
            this.setData({
                MessageModal: true,
                model_id: null,
                model_access: '',
                model_label: '',
                type: '',
                deleteinfo: event.currentTarget.dataset.access,
                DeleteModal: false
            });
    },
    infoActionSheet: function(event) {
        let id = event.currentTarget.dataset.id;
        try {
            if (id in TEMP_TOKENS) {
                let t = TEMP_TOKENS[id];
                if ("hotp" == t.type) {
                    this.setData({
                        MessageModal: true,
                        model_id: null,
                        model_access: '',
                        model_label: '',
                        type: '',
                        infoToken: String(Ga.hotp(Object.assign(Object.create(t), {
                            counter: 0
                        }))).match(/.{1,3}/g).join(' '),
                        infoCounter: t.counter,
                        infoAccess: event.currentTarget.dataset.access,
                        InfoModal: false
                    });
                }
            }
        } catch (e) {}
    },
    modalChange: function() {
        this.data.deleteid = null;
        this.setData({
            DeleteModal: true
        });
    },
    InfoTap: function() {
        this.setData({
            InfoModal: true
        });
    },
    ErrorTap: function() {
        this.setData({
            ErrorModal: true
        });
    },
    PanelTap: function() {
        this.setData({
            Panel: true
        });
    },
    MessageTap: function() {
        this.setData({
            MessageModal: true,
            model_id: null,
            model_access: '',
            model_label: '',
            type: '',
        });
    },
    modalre: function() {
        this.setData({
            reid: null,
            RenameModal: true
        });
    },
    modalDelete: function() {
        API.Config_del(this.data.deleteid);
        this.data.deleteid = null;
        this.setData({
            deleteinfo: '',
            DeleteModal: true
        });
        this.showCode(true);
    },
    modalreChange: function(event) {
        API.Config_valupdate(this.data.reid, 'label', this.data.rename);
        this.showCode(true);
        this.setData({
            reid: null,
            RenameModal: true
        });
    },
    userNameInput: function(e) {
        this.setData({
            rename: e.detail.value
        });
    },
    catchtouchmove: function() {
        return false;
    },
    singlePageTap: function() {
        this.setData({
            singlePageModal: true
        });
    },
    toWelcome: function() {
        if (singlePage) {
            return this.setData({
                singlePageModal: false
            });
        }
        if (!wx.getStorageSync('startOK')) {
            wx.navigateTo({
                url: '/pages/help/help'
            });
        } else {
            wx.navigateTo({
                url: '/pages/start/start'
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
    },
    onShareTimeline: function() {
        return {
            title: this.data.lang['shareTitle'],
            imageUrl: '/images/logo.png'
        }
    }
});