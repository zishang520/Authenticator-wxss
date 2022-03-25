/*jshint esversion: 6 */
const app = getApp();
Component({
    /**
     * 组件的一些选项
     */
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    /**
     * 组件的对外属性
     */
    properties: {
        bgColor: {
            type: String,
            value: ''
        },
        isCustom: {
            type: Boolean,
            value: false
        },
        isBack: {
            type: Boolean,
            value: false
        },
        HomePath: {
            type: String,
            value: ''
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom
    },
    /**
     * 组件的方法列表
     */
    methods: {
        BackPage() {
            if (getCurrentPages().length > 1) {
                wx.navigateBack({
                    delta: 1
                });
            }
        },
        toHome() {
            let _default = getCurrentPages()[0].route;
            wx.reLaunch({
                url: this.data.HomePath || `/${_default}`
            });
        }
    }
});