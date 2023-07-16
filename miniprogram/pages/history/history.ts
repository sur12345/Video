import { getPlayHistory, deletePlayHistory, deleteAllPlayHistory } from "../../utils/history"

Page({
    data: {
        videoList: [] as any,
        checkList: [] as any,
        deleteStatus: false,
        isAllCheck: false
    },

    initData() {
        this.setData({
            videoList: getPlayHistory(),
            checkList: getPlayHistory().map((item: any) => {
                return {
                    animation_id: item.animation_id,
                    checked: false
                }
            })
        })
    },

    changeStatus() {
        this.setData({
            deleteStatus: !this.data.deleteStatus
        })
        if (!this.data.deleteStatus) {
            this.setData({
                isAllCheck: false,
                checkList: getPlayHistory().map((item: any) => {
                    return {
                        animation_id: item.animation_id,
                        checked: false
                    }
                })
            })
        }
    },

    handleClick(e: any) {
        const { id } = e.currentTarget.dataset
        if (this.data.deleteStatus) {
            const item = this.data.checkList.find((item: any) => {
                return item.animation_id == id
            })
            item.checked = !item.checked
            this.setData({
                checkList: this.data.checkList,
                isAllCheck: this.data.checkList.every((item: any) => {
                    return item.checked == true
                })
            })
        } else {
            wx.navigateTo({
                url: `../../pages/detail/detail?id=${id}`
            })
        }
    },

    handleCheck(e: any) {
        const checkArr = e.detail.value.map((item: string) => {
            return Number(item)
        })
        this.data.checkList.forEach((item: any) => {
            const flag = checkArr.some((id: number) => {
                return id == item.animation_id
            })
            if (flag) {
                item.checked = true
            } else {
                item.checked = false
            }
        })
        this.setData({
            checkList: this.data.checkList,
            isAllCheck: this.data.checkList.every((item: any) => {
                return item.checked == true
            })
        })
    },

    handleRadio() {
        this.setData({
            isAllCheck: !this.data.isAllCheck
        })
        this.setData({
            checkList: this.data.checkList.map((item: any) => {
                return {
                    animation_id: item.animation_id,
                    checked: this.data.isAllCheck
                }
            })
        })
    },

    deleteCheck() {
        if (this.data.isAllCheck) {
            deleteAllPlayHistory()
        } else {
            const arr = this.data.checkList.filter((item: any) => {
                return item.checked == true
            }).map((item: any) => {
                return item.animation_id
            })
            deletePlayHistory(arr)
        }
        this.changeStatus()
        this.initData()
    },

    onLoad() {
        this.initData()
    },

    onReady() {

    },

    onShow() {

    },

    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        if (!this.data.deleteStatus) {
            this.initData()
        } else {
            this.setData({
                deleteStatus: false
            })
        }
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})