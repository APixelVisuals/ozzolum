module.exports = class Inventory {

    constructor(_, inv) {
        this._ = _;
        this.items = inv;
    }

    hasItems(name, amount) {

        //No amount
        if (!amount) amount = 1;

        //Get item
        const item = this.items.find(i => i.name === name);
        if (!item) return false;

        if (item.amount < amount) return false;

        return true;
    }

    addItems(name, amount) {

        //No amount
        if (!amount) return;

        //Add items
        if (!this.items.find(i => i.name === name)) this.items.push({ name, amount: 0 });

        const item = this.items.find(i => i.name === name);
        item.amount = item.amount + amount;
    }

    removeItems(name, amount) {

        //No amount
        if (!amount) return;

        //Remove items
        const item = this.items.find(i => i.name === name);
        if (!item) return;

        item.amount = item.amount - amount;

        if (item.amount <= 0) this.items.splice(this.items.indexOf(item), 1);
    }

};