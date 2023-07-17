import { reqAnimationById, reqAnimationRecommendList } from "../../api/index"
import { getPlayHistory, addPlayHistory } from "../../utils/history"

Page({
    data: {
        id: 0,
        currentOrder: 1,
        hidden: true,
        animation: {} as any,
        videoSrc: "",
        recommendList: [] as any
    },

    getAnimation: async function () {
        const res: any = await reqAnimationById(this.data.id)
        if (res.code == 200) {
            this.setData({
                animation: res.data,
                videoSrc: res.data.videos[this.data.currentOrder - 1]?.play_address || ""
            })
            if (res.data.videos.length == 0) {
                wx.showToast({
                    title: '暂无剧集',
                    icon: 'error',
                    duration: 2000
                })
            }
        }
    },

    getAnimationRecommendList: async function () {
        const res: any = await reqAnimationRecommendList(this.data.id)
        if (res.code == 200) {
            this.setData({
                recommendList: res.data
            })
        }
    },

    changeVideo(e: any) {
        this.setData({
            currentOrder: e.currentTarget.dataset.index + 1,
            videoSrc: this.data.animation.videos[e.currentTarget.dataset.index].play_address
        })
        this.addHistory()
    },

    videoPlay() {
        this.addHistory()
    },

    videoEnd() {
        if (this.data.animation.episodes > this.data.currentOrder) {
            this.setData({
                currentOrder: this.data.currentOrder + 1,
                videoSrc: this.data.animation.videos[this.data.currentOrder].play_address
            })
        }
    },

    openDetail() {
        this.setData({
            hidden: false
        })
    },

    closeDetail() {
        this.setData({
            hidden: true
        })
    },

    getHistoryOrder(id: number) {
        const arr = getPlayHistory()
        const item = arr.find((item: any) => {
            return item.animation_id == id
        })
        if (item) {
            return item.order
        }
        return 1
    },

    addHistory() {
        const { animation_id, cover, name, videos } = this.data.animation
        addPlayHistory({
            animation_id,
            cover,
            order: this.data.currentOrder,
            name,
            description: videos[this.data.currentOrder - 1].description
        })
    },

    onLoad(query: any) {
        this.setData({
            id: Number(query.id),
            currentOrder: this.getHistoryOrder(query.id)
        })
    },

    onReady() {
        this.getAnimation()
        this.getAnimationRecommendList()
    }
})