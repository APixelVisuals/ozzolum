const PlayerInventory = require("./PlayerInventory");

module.exports = class Player {

    constructor(_, data) {

        //No data
        if (!data) {
            this.noPlayer = true;
            return;
        }

        //Set data
        this._ = _;
        this.data = data;

        //Set properties
        this.inv = new PlayerInventory(_, this.data.inv);
        this.health = this.data.health;
        this.maxHealth = this.data.maxHealth;
        this.unlocks = this.data.unlocks;
        this.fighting = { ...this.data.fighting.toObject() };
        this.chopping = { ...this.data.chopping.toObject() };
        this.mining = { ...this.data.mining.toObject() };
        this.digging = { ...this.data.digging.toObject() };
        this.fishing = { ...this.data.fishing.toObject() };
        this.ozzolites = this.data.ozzolites;
        this.stats = this.data.stats;
    }

    hasUnlock(unlock) {
        return this.unlocks.includes(unlock);
    }

    unlock(unlock) {
        this.unlocks.push(unlock);
    }

    async profileImage(user) {

        //Get utils
        const { imageGenerators, _ } = this._;

        //Generate image
        return await imageGenerators.profile(_, user, {
            health: this.health,
            maxHealth: this.maxHealth,
            fighting: this.fighting,
            ozzolites: this.ozzolites
        });
    }

    async skillsImage(user) {

        //Get utils
        const { imageGenerators, _ } = this._;

        //Generate image
        return await imageGenerators.skills(_, user, [
            { name: "Fighting", ...this.fighting },
            { name: "Chopping", ...this.chopping },
            { name: "Mining", ...this.mining },
            { name: "Digging", ...this.digging },
            this.hasUnlock("fishing") && { name: "Fishing", ...this.fishing }
        ].filter(s => s));
    }

    //Stats
    incrementStats(name, amount) {

        //Amount is 0
        if (amount === 0) return;

        //Parse amount
        if (!amount) amount = 1;

        //Update stats
        if (!this.stats.find(s => s.name === name)) this.stats.push({ name, count: 0 });

        const stat = this.stats.find(s => s.name === name);
        stat.count = stat.count + amount;
    }

    //Get data
    getData() {

        //Parse
        this.data.inv = this.inv.items;
        this.data.health = this.health;
        this.data.maxHealth = this.maxHealth;
        this.data.unlocks = this.unlocks;
        this.data.fighting = { ...this.fighting };
        this.data.chopping = { ...this.chopping };
        this.data.mining = { ...this.mining };
        this.data.digging = { ...this.digging };
        this.data.fishing = { ...this.fishing };
        this.data.ozzolites = this.ozzolites;
        this.data.stats = this.stats;

        //Return
        return this.data;
    }

};