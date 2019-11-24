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
        this.axe = this.data.axe;
        this.pickaxe = this.data.pickaxe;
        this.shovel = this.data.shovel;
        this.fishingRod = this.data.fishingRod;
        this.weapon = this.data.weapon;
        this.health = this.data.health;
        this.maxHealth = this.data.maxHealth;
        this.unlocks = this.data.unlocks;
        this.fightingXP = { ...this.data.fightingXP.toObject() };
        this.choppingXP = { ...this.data.choppingXP.toObject() };
        this.miningXP = { ...this.data.miningXP.toObject() };
        this.diggingXP = { ...this.data.diggingXP.toObject() };
        this.fishingXP = { ...this.data.fishingXP.toObject() };
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
            fightingXP: this.fightingXP,
            ozzolites: this.ozzolites
        });
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
        this.data.axe = this.axe;
        this.data.pickaxe = this.pickaxe;
        this.data.shovel = this.shovel;
        this.data.fishingRod = this.fishingRod;
        this.data.weapon = this.weapon;
        this.data.health = this.health;
        this.data.maxHealth = this.maxHealth;
        this.data.unlocks = this.unlocks;
        this.data.fightingXP = { ...this.fightingXP };
        this.data.choppingXP = { ...this.choppingXP };
        this.data.miningXP = { ...this.miningXP };
        this.data.diggingXP = { ...this.diggingXP };
        this.data.fishingXP = { ...this.fishingXP };
        this.data.ozzolites = this.ozzolites;
        this.data.stats = this.stats;

        //Return
        return this.data;
    }

};