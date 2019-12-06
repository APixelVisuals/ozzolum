module.exports = {
    _id: String,
    inv: {
        name: {
            type: String,
            default: "Storage Locker"
        },
        slots: {
            type: Number,
            default: 200
        },
        stackSize: {
            type: Number,
            default: 100
        },
        items: [{
            name: String,
            amount: Number
        }]
    }
};