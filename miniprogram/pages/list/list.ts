import { reqCategoryList, reqRankList } from "../../api/index"

Page({

    data: {
        notDataFlag: false,
        page: 1,
        limit: 5,
        tag: "",
        order: "",
        list: [] as any
    },

    onLoad(query) {
        this.setData({
            tag: query.categoryKey || "",
            order: query.rankKey || ""
        })
    },

    getList: (function () {
        let flag = true
        return async function () {
            if (flag) {
                flag = false
                if (!this.data.notDataFlag) {
                    const { page, limit, tag, order } = this.data
                    let res: any = {}
                    if (tag) {
                        res = await reqCategoryList({
                            page,
                            limit,
                            tag
                        })
                    } else {
                        res = await reqRankList({
                            page,
                            limit,
                            order
                        })
                    }
                    if (res.code == 200) {
                        if (this.data.page >= res.data.pages) {
                            this.setData({
                                notDataFlag: true
                            })
                        }
                        this.setData({
                            page: this.data.page + 1,
                            list: [...this.data.list, ...res.data.animations]
                        })
                    }
                }
                flag = true
            }
        }
    })(),

    onReady() {
        this.getList()
    },

    onShow() {

    },

    onHide() {

    },

    onUnload() {

    },

    onPullDownRefresh() {

    },

    onReachBottom() {
        this.getList()
    },

    onShareAppMessage() {

    }
})