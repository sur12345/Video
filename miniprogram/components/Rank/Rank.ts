// components/Rank/Rank.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        rank: {
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
        handleClick(e: any) {
            wx.navigateTo({
                url: `../../pages/list/list?rankKey=${e.currentTarget.dataset.search}`
            })
        }
    }
})
