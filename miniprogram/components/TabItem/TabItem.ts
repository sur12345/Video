// components/TabItem/TabItem.ts
Component({
    relations: {
        "../Tab/Tab": {
            type: "parent"
        }
    },
    properties: {
        label: String,
        name: {
            type: String,
            optionalTypes: [Number]
        }
    },
    data: {
        hidden: true
    },
    methods: {

    }
})
