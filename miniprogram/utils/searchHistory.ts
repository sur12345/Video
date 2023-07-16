function getSearchHistory() {
    let list = wx.getStorageSync("searchHistory") || []
    return list
}

function addSearchHistory(name: string) {
    const history = getSearchHistory()
    const index = history.findIndex((item: any) => {
        return name == item
    })
    if (index > -1) {
        history.splice(index, 1)
        history.unshift(name)
    } else {
        history.unshift(name)
    }
    wx.setStorageSync("searchHistory", history)
}

function deleteAllSearchHistory() {
    wx.setStorageSync("searchHistory", [])
}

export {
    getSearchHistory,
    addSearchHistory,
    deleteAllSearchHistory
}