module.exports = async ({ client, util, _ }, message) => {

    //Pre Module
    if (!util.cooldown(_, message)) return new Error("Cooldown not done");
    const { player } = message.author;

    //Get params
    let item = message.content.split(" ").slice(1).join(" ");

    //No item
    if (!item) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, What would you like to equip?**`);

    //Get item
    item = util.searchItems(_, item);
    if (!player.inv.hasItems(item.name)) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You don't have that item!**`);

    //Not equippable
    if (!item.equipType) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, That item isn't equippable!**`);

    //Update inv
    const updated = player.inv.updateItems({ remove: item.name, add: player[item.equipType].tool });
    if (!updated) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, There isn't enough space in your inventory to unequip your ${player[item.equipType].tool}!**`);

    //Equip
    player[item.equipType].tool = item.name;

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  ${message.author}, You've equipped a ${item.name}!**`);
};