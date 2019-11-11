module.exports = {
    //User ID
    _id: String,
    ozzolites: {
        type: Number,
        default: 0
    },
    stats: [{
        name: String,
        count: Number
    }]
};