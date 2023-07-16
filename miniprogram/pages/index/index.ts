import { reqAnimationList, reqCategory, reqRank } from "../../api/index"
import { getPlayHistory } from "../../utils/history"

Page({
    data: {
        name: "recommend",
        recommendFlag: true,
        recommendParams: {
            page: 1,
            limit: 3
        } as any,
        recommendList: [] as any,
        category: [],
        rank: [],
        updateFlag: true,
        updateParams: {
            page: 1,
            limit: 3,
            order: "update_time"
        } as any,
        updateList: [],
        login: false,
        userInfo: {},
        historyList: []
    },

    getRecommendList: (function () {
        let flag = true
        return async function () {
            if (flag) {
                flag = false
                if (this.data.recommendFlag) {
                    const res: any = await reqAnimationList(this.data.recommendParams)
                    if (res.code == 200) {
                        if (this.data.recommendParams.page >= res.data.pages) {
                            this.setData({
                                recommendFlag: false
                            })
                        }
                        this.setData({
                            recommendParams: {
                                ...this.data.recommendParams,
                                page: this.data.recommendParams.page + 1
                            },
                            recommendList: [...this.data.recommendList, ...res.data.animations]
                        })
                    }
                }
                flag = true
            }
        }
    })(),

    getCategory: async function () {
        const res: any = await reqCategory()
        if (res.code == 200) {
            this.setData({
                category: res.data
            })
        }
    },

    getRank: async function () {
        const res: any = await reqRank()
        if (res.code == 200) {
            this.setData({
                rank: res.data
            })
        }
    },

    getUpdateList: (function () {
        let flag = true
        return async function () {
            if (flag) {
                flag = false
                if (this.data.updateFlag) {
                    const res: any = await reqAnimationList(this.data.updateParams)
                    if (this.data.updateParams.page >= res.data.pages) {
                        this.setData({
                            updateFlag: false
                        })
                    }
                    this.setData({
                        updateParams: {
                            ...this.data.updateParams,
                            page: this.data.updateParams.page + 1
                        },
                        updateList: [...this.data.updateList, ...res.data.animations]
                    })
                }
                flag = true
            }
        }
    })(),

    toDetail(e: any) {
        wx.navigateTo({
            url: `../detail/detail?id=${e.currentTarget.dataset.id}`
        })
    },

    toSearch() {
        wx.navigateTo({
            url: "../search/search"
        })
    },

    watchHistory() {
        wx.navigateTo({
            url: `../../pages/history/history`
        })
    },

    login() {
        wx.getUserProfile({
            desc: '获取用户信息',
            success: (res) => {
                const {
                    nickName,
                    avatarUrl
                } = res.userInfo
                const userInfo = {
                    nickName,
                    avatarUrl
                }
                //持久化存储
                wx.setStorageSync('userInfo', userInfo)
                wx.setStorageSync('login', true)
                this.setData({
                    login: true,
                    userInfo
                })
            }
        })
    },

    onLoad() {
        const login = Boolean(wx.getStorageSync("login"))
        const userInfo = wx.getStorageSync("userInfo")
        this.setData({
            login
        })
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
    },

    onReady() {
        this.getRecommendList()
        this.getCategory()
        this.getRank()
        this.getUpdateList()
    },

    onShow() {
        this.setData({
            historyList: getPlayHistory().slice(0, 3)
        })
    },

    onReachBottom() {
        if (this.data.name == "recommend") {
            this.getRecommendList()
        }
        if (this.data.name == "update") {
            this.getUpdateList()
        }
    }
})