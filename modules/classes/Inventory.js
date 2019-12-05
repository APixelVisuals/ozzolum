module.exports = class Inventory {

    constructor(_, inv) {
        this._ = _;
        this.name = inv.name;
        this.slots = inv.slots;
        this.stackSize = inv.stackSize;
        this.items = inv.items;
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

    getItem(searchQuery, all) {

        //Get utils
        const { util } = this._;

        //Get items
        let items = [...this.items];

        items = items.map(i => {

            const item = util.items[i.name];

            const nameTags = i.name.toLowerCase().replace(/[^a-z ]/g, "").split(" ");
            const typeTags = item.type.toLowerCase().replace(/[^a-z ]/g, "").split(" ");
            const itemTags = [...new Set([...item.tags, ...nameTags, ...typeTags])].filter(t => t);

            const queryTags = [...new Set(searchQuery.toLowerCase().replace(/[^a-z ]/g, "").split(" "))].filter(t => t);

            const matches = itemTags.filter(t => queryTags.some(tt => t.startsWith(tt) || t.endsWith(tt))).length;

            return matches ? { item: i, matches } : null;
        }).filter(i => i).sort((a, b) => b.matches - a.matches).map(i => i.item);

        //Return
        return all ? items : (items[0] && { name: items[0].name, ...util.items[items[0].name] });
    }

    addItem(name, amount) {

        //No amount
        if (amount === undefined) amount = 1;

        //No params
        if ((!name) || (!amount)) return;

        //Add item
        if (!this.items.find(i => i.name === name)) this.items.push({ name, amount: 0 });

        const item = this.items.find(i => i.name === name);
        item.amount = item.amount + amount;
    }

    removeItem(name, amount) {

        //No amount
        if (amount === undefined) amount = 1;

        //No params
        if ((!name) || (!amount)) return;

        //Remove item
        const item = this.items.find(i => i.name === name);
        if (!item) return;

        item.amount = item.amount - amount;

        if (item.amount <= 0) this.items.splice(this.items.indexOf(item), 1);
    }

    async toImage(user, page, searchQuery) {

        //Get utils
        const { imageGenerators, _ } = this._;

        //Get items
        const startingItem = 10 * (page - 1);
        let items = [...this.items];

        if (searchQuery) items = this.getItem(searchQuery, true);
        else items = items.sort((a, b) => a.name < b.name ? -1 : 1);

        items = items.slice(startingItem, startingItem + 10);

        //Generate image
        return await imageGenerators.inventory(_, user, items);
    }

    getData() {
        return {
            name: this.name,
            slots: this.slots,
            stackSize: this.stackSize,
            items: this.items
        };
    }

};