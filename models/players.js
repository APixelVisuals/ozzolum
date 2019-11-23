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
    axe: String,
    pickaxe: String,
    shovel: String,
    fishingRod: String,
    weapon: String,
    battleXP: {
        xp: {
            type: Number,
            default: 0
        },
        totalXP: {
            type: Number,
            default: 0
        },
        level: {
            type: Number,
            default: 0
        }
    },
    stats: [{
        name: String,
        count: Number
    }]
};