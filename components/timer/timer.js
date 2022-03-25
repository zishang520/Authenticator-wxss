/*jshint esversion: 6 */
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
        width: {
            type: String,
            value: '16px',
        },
        percent: {
            type: Number,
            value: 0,
        },
        deg: {
            type: Number,
            value: 0,
        }
    },
    /**
     * 组件的初始数据
     */
    data: {},
    /**
     * 组件的方法列表
     */
    methods: {}
});