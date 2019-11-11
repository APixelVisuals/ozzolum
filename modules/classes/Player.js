const PlayerInventory = require("./PlayerInventory");

module.exports = class Player {

    constructor(data) {

        //Set data
        this.data = data;

        //Set properties
        this.ozzolites = this.data.ozzolites;
        this.inv = new PlayerInventory(this.data.inv);
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
        this.data.inv = this.inv.getItems();
        this.data.stats = this.stats;

        //Return
        return this.data;
    }

};