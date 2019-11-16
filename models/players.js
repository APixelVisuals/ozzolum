module.exports = {
    //User ID
    _id: String,
    ozzolites: {
        type: Number,
        default: 0
    },
    inv: [{
        name: String,
        amount: Number
    }],
    stats: [{
        name: String,
        count: Number
    }]
};