module.exports = {
    //User ID
    _id: String,
    inv: [{
        name: String,
        amount: Number
    }],
    axe: String,
    pickaxe: String,
    shovel: String,
    fishingRod: String,
    weapon: String,
    health: {
        type: Number,
        default: 200
    },
    maxHealth: {
        type: Number,
        default: 200
    },
    fightingXP: {
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
    choppingXP: {
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
    miningXP: {
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
    diggingXP: {
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
    fishingXP: {
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
    ozzolites: {
        type: Number,
        default: 0
    },
    stats: [{
        name: String,
        count: Number
    }]
};