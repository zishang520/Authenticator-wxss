Component({
    /**
     * 组件的一些选项
     */
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    properties: {
        options: {
            type: Array,
            value: []
        },
        selected: {
            type: Object,
            value: {}
        },
        key: {
            type: String,
            value: 'id'
        },
        text: {
            type: String,
            value: 'name'
        }
    },
    data: {
        isShow: false,
        current: {}
    },
    methods: {
        optionTap(e) {
            let dataset = e.target.dataset
            this.setData({
                current: dataset,
                isShow: false
            });

            // 调用父组件方法，并传参
            this.triggerEvent("change", {
                ...dataset
            })
        },
        openClose() {
            this.setData({
                isShow: !this.data.isShow
            })
        },

        // 此方法供父组件调用
        close() {
            this.setData({
                isShow: false
            })
        }
    },
    lifetimes: {
        detached() {
            this.close();
        },
    },
    pageLifetimes: {
        show() {
            this.setData({
                current: this.data.options.length > 0 ? Object.assign(Object.assign({}, this.data.options[0]), this.data.selected) : {},
                key: this.data.key,
                text: this.data.text,
            })
        },
        hide() {
            this.close();
        },
        resize() {
            this.close();
        }
    }
})