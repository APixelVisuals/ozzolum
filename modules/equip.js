module.exports = async ({ client, util, _ }, message) => {

    //Pre Module
    if (!await util.cooldown(_, message, 2000)) return;
    const { player } = message.author;

    //Get params
    let item = message.content.split(" ").slice(1).join(" ");

    //No item
    if (!item) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, What would you like to equip?**`);

    //Get item
    item = player.inv.getItem(item);
    if (!item) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You don't have that item!**`);

    //Not equippable
    if (!item.equipType) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, That item isn't equippable!**`);

    //Equip
    player.inv.addItem(player[item.equipType].tool);
    player.inv.removeItem(item.name);
    player[item.equipType].tool = item.name;

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  ${message.author}, You've equipped a ${item.name}!**`);
};