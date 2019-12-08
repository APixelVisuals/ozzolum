module.exports = class Inventory {

    constructor(_, inv) {
        this._ = _;
        this.name = inv.name;
        this.slots = inv.slots;
        this.stackSize = inv.stackSize;
        this.items = inv.items;
    }

    hasItems(items, returnMissing) {

        //Parse items
        if (typeof items === "string") items = { name: items };
        if (!(items instanceof Array)) items = [items];

        //Clone inv items
        let invItems = [...this.items].map(i => ({ ...i }));

        //Missing items
        const missing = [];

        //Loop through items
        for (let i of items) {

            //No amount
            if (i.amount === undefined) i.amount = 1;

            //No params
            if ((!i.name) || (!i.amount)) continue;

            //Get total item count
            const total = invItems.filter(ii => ii.name === i.name).reduce((t, ii) => t + ii.amount, 0);

            //Not enough items
            if (total < i.amount) missing.push({ name: i.name, amount: i.amount - total });
        }

        //Return
        return returnMissing ? missing : missing.length === 0;
    }

    addItems(items, force, inv) {

        //No items
        if (!items) return;

        //Parse items
        if (typeof items === "string") items = { name: items };
        if (!(items instanceof Array)) items = [items];

        items = items.map(i => ({ ...i, amount: (i.amount === undefined ? 1 : i.amount) })).filter(i => (i.name) && (i.amount));

        //Clone inv items
        let invItems = [...(inv || this.items)].map(i => ({ ...i }));

        //Dropped
        const dropped = [];

        //Loop through items
        for (let i of items) {

            //Get total item count
            const total = invItems.filter(ii => ii.name === i.name).reduce((t, ii) => t + ii.amount, 0) + i.amount;

            //Remove items
            invItems = invItems.filter(ii => ii.name !== i.name);

            //Add items to stacks
            for (let j = 0; j < Math.floor(total / this.stackSize); j++) {
                if (invItems.length === this.slots) {
                    const droppedItem = dropped.find(ii => ii.name === i.name);
                    if (droppedItem) droppedItem.amount = droppedItem.amount + this.stackSize;
                    else dropped.push({ name: i.name, amount: this.stackSize, dropped: true });
                }
                else invItems.push({ name: i.name, amount: this.stackSize });
            }

            if (total % this.stackSize) {
                if (invItems.length === this.slots) {
                    const droppedItem = dropped.find(ii => ii.name === i.name);
                    if (droppedItem) droppedItem.amount = droppedItem.amount + total % this.stackSize;
                    else dropped.push({ name: i.name, amount: total % this.stackSize, dropped: true });
                }
                else invItems.push({ name: i.name, amount: total % this.stackSize });
            }
        }

        //Set items
        if (((!dropped.length) || (force)) && (!inv)) this.items = invItems;

        //Return
        return {
            inv: invItems,
            dropped,
            added: items.map(i => {
                const droppedItem = dropped.find(ii => ii.name === i.name);
                const amount = i.amount - (droppedItem ? droppedItem.amount : 0);
                return amount ? { name: i.name, amount, added: true } : null;
            }).filter(i => i)
        };
    }

    removeItems(items, force, inv) {

        //No items
        if (!items) return;

        //Parse items
        if (typeof items === "string") items = { name: items };
        if (!(items instanceof Array)) items = [items];

        items = items.map(i => ({ ...i, amount: (i.amount === undefined ? 1 : i.amount) })).filter(i => (i.name) && (i.amount));

        //Clone inv items
        let invItems = [...(inv || this.items)].map(i => ({ ...i }));

        //Missing
        const missing = [];

        //Loop through items
        for (let i of items) {

            //Get total item count
            let total = invItems.filter(ii => ii.name === i.name).reduce((t, ii) => t + ii.amount, 0) - i.amount;

            //Not enough items
            if (total < 0) {
                missing.push({ name: i.name, amount: total / -1, missing: true });
                total = 0;
            }

            //Remove items
            invItems = invItems.filter(ii => ii.name !== i.name);

            //Add items to stacks
            for (let j = 0; j < Math.floor(total / this.stackSize); j++) invItems.push({ name: i.name, amount: this.stackSize });
            if (total % this.stackSize) invItems.push({ name: i.name, amount: total % this.stackSize });
        }

        //Set items
        if (((!missing.length) || (force)) && (!inv)) this.items = invItems;

        //Return
        return {
            inv: invItems,
            missing,
            removed: items.map(i => {
                const missingItem = missing.find(ii => ii.name === i.name);
                const amount = i.amount - (missingItem ? missingItem.amount : 0);
                return amount ? { name: i.name, amount, added: true } : null;
            }).filter(i => i)
        };
    }

    updateItems({ remove, add }) {

        //Clone inv items
        let invItems = [...this.items].map(i => ({ ...i }));

        //Remove items
        const removeData = this.removeItems(remove || [], null, invItems);
        if (removeData.missing.length) return;
        invItems = removeData.inv;

        //Add items
        const addData = this.addItems(add || [], null, invItems);
        if (addData.dropped.length) return;
        invItems = addData.inv;

        //Set items
        this.items = invItems;

        //Return
        return true;
    }

    async toImage(user, page, searchQuery) {

        //Get utils
        const { imageGenerators, util, _ } = this._;

        //Get items
        const startingItem = 10 * (page - 1);
        let items = [...this.items];
        let error;

        if (searchQuery) {
            items = items.map(i => {

                const item = util.items.find(ii => ii.name === i.name);

                const nameTags = i.name.toLowerCase().replace(/[^a-z ]/g, "").split(" ");
                const typeTags = item.type.toLowerCase().replace(/[^a-z ]/g, "").split(" ");
                const itemTags = [...new Set([...item.tags, ...nameTags, ...typeTags])].filter(t => t);

                const queryTags = [...new Set(searchQuery.toLowerCase().replace(/[^a-z ]/g, "").split(" "))].filter(t => t);

                const matches = itemTags.filter(t => queryTags.some(tt => t.startsWith(tt) || t.endsWith(tt))).length;

                return matches ? { item: i, matches } : null;
            }).filter(i => i).sort((a, b) => (b.matches - a.matches) || (a.item.name < b.item.name ? -1 : (a.item.name > b.item.name ? 1 : 0)) || (b.item.amount - a.item.amount)).map(i => i.item);
            if (!items.length) error = "You don't have any Items that\nmatch that search query!";
        }
        else {
            items = items.sort((a, b) => (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)) || (b.amount - a.amount));
            if (!items.length) error = "You don't have any Items!";
        }

        items = items.slice(startingItem, startingItem + 10);
        if ((!items.length) && (startingItem)) error = "You don't have that many Items!\nTry a lower page number";

        //Generate image
        return await imageGenerators.inventory(_, user, items, this.name, { used: this.items.length, total: this.slots }, error);
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