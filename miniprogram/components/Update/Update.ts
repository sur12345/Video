// components/Update/Update.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        toDetail(e: any) {
            wx.navigateTo({
                url: `../../pages/detail/detail?id=${this.data.list[e.currentTarget.dataset.index].animation_id}`
            })
        }
    }
})
