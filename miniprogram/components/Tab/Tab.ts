// components/Tab/Tab.ts
Component({
    relations: {
        "../TabItem/TabItem": {
            type: "child"
        }
    },
    properties: {
        name: {
            type: String,
            optionalTypes: [Number]
        }
    },
    data: {
        tabItems: [] as any
    },
    methods: {
        getLabelsAndNames() {
            const items = this.getRelationNodes("../TabItem/TabItem")
            const tabItems = items.map(item => {
                return {
                    label: item.properties.label,
                    name: item.properties.name
                }
            })
            this.setData({
                tabItems
            })
        },
        handleClick(e: any) {
            this.setData({
                name: e.target.dataset.name
            })
        }
    },
    observers: {
        'name': function (name) {
            wx.nextTick(() => {
                const items = this.getRelationNodes("../TabItem/TabItem")
                items.forEach((item: any) => {
                    if (item.properties.name == name) {
                        item.setData({
                            hidden: false
                        })
                    } else {
                        item.setData({
                            hidden: true
                        })
                    }
                })
            })
        }
    },
    lifetimes: {
        ready() {
            this.getLabelsAndNames()
        }
    }
})
