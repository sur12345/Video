// components/VideoItem/VideoItem.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        rankIndex:{
            type:Number
        },
        video:{
            type:Object
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
        toDetail(){
            wx.navigateTo({
                url:`../../pages/detail/detail?id=${this.properties.video.animation_id}`
            })
        }
    }
})
