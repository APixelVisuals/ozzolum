module.exports = async ({ client, util, _ }, message) => {

    //Pre Module
    if (!util.cooldown(_, message)) return new Error("Cooldown not done");
    const { player } = message.author;

    //Get params
    let item = message.content.split(" ").slice(1).join(" ");

    //No item
    if (!item) return util.error(_, message, "What would you like to equip?", "what to equip");

    //Get item
    item = util.searchItems(_, item);
    if (!item) return util.error(_, message, "That item doesn't exist!");

    //Dont have item
    if (!player.inv.hasItems(item.name)) return util.error(_, message, "You don't have that item!", "check items");

    //Not equippable
    if (!item.equipType) return util.error(_, message, "That item isn't equippable!", "what to equip");

    //Update inv
    const updated = player.inv.updateItems({ remove: item.name, add: player[item.equipType].tool });
    if (!updated) return util.error(_, message, `There isn't enough space in your inventory to unequip your ${player[item.equipType].tool}!`, "no inv space");

    //Equip
    player[item.equipType].tool = item.name;

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  ${message.author}, You've equipped the ${item.name}!**`);
};