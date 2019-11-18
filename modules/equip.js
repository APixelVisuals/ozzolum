module.exports = async ({ client, util, _ }, message) => {

    //Cooldown
    if (!await util.cooldown(_, message, 2000)) return;

    //Get params
    let item = message.content.split(" ").slice(1).join(" ");

    //No item
    if (!item) return message.channel.send(`:x:  **|  ${message.author}, What would you like to equip?**`);

    //Get item
    item = message.author.player.inv.getItem(item);
    if (!item) return message.channel.send(`:x:  **|  ${message.author}, You don't have that item!**`);

    //Not equippable
    if (!item.equipType) return message.channel.send(`:x:  **|  ${message.author}, That item isn't equippable!**`);

    //Equip
    message.author.player.inv.addItem(message.author.player[item.equipType]);
    message.author.player.inv.removeItem(item.name);
    message.author.player[item.equipType] = item.name;

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  ${message.author}, You've equipped a ${item.name}!**`);
};