module.exports = {
    //User ID
    _id: String,
    backpack: {
        name: {
            type: String,
            default: "Leather Satchel"
        },
        slots: {
            type: Number,
            default: 25
        },
        items: [{
            name: String,
            amount: Number
        }]
    },
    health: {
        type: Number,
        default: 200
    },
    maxHealth: {
        type: Number,
        default: 200
    },
    unlocks: [String],
    fighting: {
        tool: String,
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
    chopping: {
        tool: String,
        cooldown: Number,
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
    mining: {
        tool: String,
        cooldown: Number,
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
    digging: {
        tool: String,
        cooldown: Number,
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
    fishing: {
        tool: String,
        cooldown: Number,
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