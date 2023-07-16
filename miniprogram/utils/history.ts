function padStart(num: number) {
    return String(num).padStart(2, "0")
}

function getHistoryTime(time: any) {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const now = new Date()
    const now_year = now.getFullYear()
    const now_month = now.getMonth() + 1
    const now_day = now.getDate()
    let title = ""
    if (year == now_year && month == now_month && day == now_day) {
        title = `今天 ${padStart(hours)}:${padStart(minutes)}`
    } else if (year == now_year && month == now_month && day == now_day - 1) {
        title = `昨天 ${padStart(hours)}:${padStart(minutes)}`
    } else {
        title = `${year}-${padStart(month)}-${padStart(day)} ${padStart(hours)}:${padStart(minutes)}`
    }
    return title
}

function getPlayHistory() {
    let list = wx.getStorageSync("playHistory") || []
    list = list.map((item: any) => {
        return {
            ...item,
            timeFormat: getHistoryTime(item.time)
        }
    })
    return list
}

function addPlayHistory(data: any) {
    const time = new Date().getTime()
    data.time = time
    const history = getPlayHistory()
    const index = history.findIndex((item: any) => {
        return data.animation_id == item.animation_id
    })
    if (index > -1) {
        history.splice(index, 1)
        history.unshift(data)
    } else {
        history.unshift(data)
    }
    wx.setStorageSync("playHistory", history)
}

function deletePlayHistory(arr: number[]) {
    let history = getPlayHistory()
    history = history.filter((item: any) => {
        return arr.every((id: number) => {
            return item.animation_id != id
        })
    })
    wx.setStorageSync("playHistory", history)
}

function deleteAllPlayHistory() {
    wx.setStorageSync("playHistory", [])
}

export {
    getPlayHistory,
    addPlayHistory,
    deletePlayHistory,
    deleteAllPlayHistory
}