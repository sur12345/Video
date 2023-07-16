export const request = {
    get(url:string,options:any={}) {
        return new Promise((resolve, reject) => {
            wx.request({
                ...options,
                url,
                method:"GET",
                success: (res) => {
                    resolve(res.data)
                },
                fail: (err) => {
                    reject(err)
                }
            })
        })
    },
    post(url:string,data:any,options:any={}) {
        return new Promise((resolve, reject) => {
            wx.request({
                ...options,
                url,
                data,
                method:"POST",
                success: (res) => {
                    resolve(res.data)
                },
                fail: (err) => {
                    reject(err)
                }
            })
        })
    }
}