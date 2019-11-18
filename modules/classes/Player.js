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
        this.ozzolites = this.data.ozzolites;
        this.inv = new PlayerInventory(_, this.data.inv);
        this.axe = this.data.axe;
        this.pickaxe = this.data.pickaxe;
        this.shovel = this.data.shovel;
        this.fishingRod = this.data.fishingRod;
        this.weapon = this.data.weapon;
        this.stats = this.data.stats;
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
        this.data.ozzolites = this.ozzolites;
        this.data.inv = this.inv.items;
        this.data.axe = this.axe;
        this.data.pickaxe = this.pickaxe;
        this.data.shovel = this.shovel;
        this.data.fishingRod = this.fishingRod;
        this.data.weapon = this.weapon;
        this.data.stats = this.stats;

        //Return
        return this.data;
    }

};