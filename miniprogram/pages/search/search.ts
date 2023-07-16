import { reqSearchList } from "../../api/index"
import { getSearchHistory, addSearchHistory, deleteAllSearchHistory } from "../../utils/searchHistory"

Page({
    data: {
        value: "",
        searchStatus: true,
        searchFlag: true,
        searchParams: {
            page: 1,
            limit: 5,
            name: ""
        } as any,
        searchList: [] as any,
        searchHistory: [] as any
    },

    getSearchList: (function () {
        let flag = true
        return async function () {
            if (flag) {
                flag = false
                if (this.data.searchFlag) {
                    const res: any = await reqSearchList(this.data.searchParams)
                    if (res.code == 200) {
                        if (this.data.searchParams.page >= res.data.pages) {
                            this.setData({
                                searchFlag: false
                            })
                        }
                        this.setData({
                            searchParams: {
                                ...this.data.searchParams,
                                page: this.data.searchParams.page + 1
                            },
                            searchList: [...this.data.searchList, ...res.data.animations]
                        })
                    }
                }
                flag = true
            }
        }
    })(),

    handleInput(e: any) {
        if (e.detail.value.length == 0) {
            this.setData({
                searchStatus: true
            })
            this.getHistory()
        }
        this.setData({
            value: e.detail.value
        })
    },

    async confirm(e: any) {
        const name = e.detail.value.trim()
        if (name.length == 0) {
            this.setData({
                value: ""
            })
            wx.showToast({
                title: '输入不能为空',
                icon: 'error',
                duration: 2000
            })
            return
        }
        addSearchHistory(name)
        this.setData({
            searchStatus: false,
            searchFlag: true,
            searchParams: {
                page: 1,
                limit: 5,
                name
            } as any,
            searchList: [] as any
        })
        this.getSearchList()
    },

    clearInput() {
        this.setData({
            value: "",
            searchStatus: true
        })
        this.getHistory()
    },

    search(e: any) {
        const name = e.currentTarget.dataset.name
        addSearchHistory(name)
        this.setData({
            value: name,
            searchStatus: false,
            searchFlag: true,
            searchParams: {
                page: 1,
                limit: 5,
                name
            } as any,
            searchList: [] as any
        })
        this.getSearchList()
    },

    getHistory() {
        this.setData({
            searchHistory: getSearchHistory()
        })
    },

    deleteHistory() {
        deleteAllSearchHistory()
        this.getHistory()
    },

    onLoad() {
        this.getHistory()
    },

    onReachBottom() {
        if (!this.data.searchStatus) {
            this.getSearchList()
        }
    }
})