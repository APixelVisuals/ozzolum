module.exports = async ({ client, util, classes, models, simulatedChannel, _ }, message) => {

    //Pre Module
    if (!util.cooldown(_, message)) return new Error("Cooldown not done");
    const { player } = message.author;

    //Get params
    const PARAMS = message.content.split(" ");
    let amount = parseInt(PARAMS.slice(1, 2).join(" "));
    let item = PARAMS.slice(2).join(" ");

    //No amount
    if (isNaN(amount)) {
        amount = 1;
        item = PARAMS.slice(1).join(" ");
    }

    //Invalid amount
    if (amount < 1) amount = 1;

    //Get location data
    const location = util.locations.find(l => l.channel === ((message.channel.id === client.testing.id && simulatedChannel) ? simulatedChannel : message.channel.id));
    if (!location) return;

    //Location isnt home
    if (location.name !== "Home") return util.error(_, message, `You can only take items from your Home Inventory in ${client.channels.get(util.locations.find(l => l.name === "Home").channel)}!`);

    //No item
    if (!item) return util.error(_, message, "What would you like to take from your Home Inventory?", "check home inv items");

    //Get item
    item = util.searchItems(_, item);
    if (!item) return util.error(_, message, "That item doesn't exist!");

    //Create home inventory
    const homeData = await models.homeInvs.findById(message.author.id);
    const homeInv = new classes.Inventory(_, homeData.inv.toObject());

    //Not enough items
    const missing = homeInv.hasItems({ name: item.name, amount }, true);
    if (missing.length) return util.error(_, message, `You ${amount === missing[0].amount ? "don't have any" : `only have ${amount - missing[0].amount}`} ${item.name} in your Home Inventory!`, "check home inv items");

    //Move items
    const updated = util.updateItems({
        remove: {
            inv: homeInv,
            items: { name: item.name, amount }
        },
        add: {
            inv: player.inv,
            items: { name: item.name, amount }
        }
    });
    if (!updated) return util.error(_, message, "You don't have enough space in your Inventory!");

    //Save
    homeData.inv = homeInv.getData();
    await util.save(_, homeData);

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  ${message.author}, You've taken ${amount} ${item.name} from your Home Inventory!**`);

    //Stats
    await util.stats(_, "Items Taken", amount);
};