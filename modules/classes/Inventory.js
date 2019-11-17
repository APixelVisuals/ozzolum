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

    async toImage(user, page, searchQuery) {

        //Get utils
        const { imageGenerators, util, _ } = this._;

        //Get items
        const startingItem = 10 * (page - 1);
        let items = [...this.items];

        if (searchQuery) items = items.map(i => {

            const nameTags = i.name.toLowerCase().replace(/[^a-z ]/g, "").split(" ");
            const itemTags = [...new Set(util.items[i.name].concat(nameTags))].filter(t => t);

            const queryTags = [...new Set(searchQuery.toLowerCase().replace(/[^a-z ]/g, "").split(" "))].filter(t => t);

            const matches = itemTags.filter(t => queryTags.some(tt => t.startsWith(tt) || t.endsWith(tt))).length;

            return matches ? { item: i, matches } : null;
        }).filter(i => i).sort((a, b) => b.matches - a.matches).map(i => i.item);
        else items = items.sort((a, b) => a.name < b.name ? -1 : 1);

        items = items.slice(startingItem, startingItem + 10);

        //Generate image
        return await imageGenerators.inventory(_, user, items);
    }

};