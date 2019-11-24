module.exports = async ({ client, util, _ }, message) => {

    //Cooldown
    if (!await util.cooldown(_, message, 2000)) return;

    //Get params
    let type = message.content.split(" ").slice(1).join(" ").toLowerCase().replace(/\s+/g, "");

    //No type
    if (!type) return message.channel.send(`:x:  **|  ${message.author}, What type of item would you like to unequip?**`);

    //Parse type
    if (["weapon", "sword"].includes(type)) type = "fighting";
    else if (["axe", "hatchet"].includes(type)) type = "chopping";
    else if (["pickaxe", "pick"].includes(type)) type = "mining";
    else if (["shovel"].includes(type)) type = "digging";
    else if (["fishingrod", "fishingpole"].includes(type)) type = "fishing";
    else return message.channel.send(`:x:  **|  ${message.author}, That item type doesn't exist!**`);

    //Not equipped
    if (!message.author.player[type].tool) return message.channel.send(`:x:  **|  ${message.author}, You don't have ${{
        fighting: "a Weapon",
        chopping: "an Axe",
        mining: "a Pickaxe",
        digging: "a Shovel",
        fishing: "a Fishing Rod"
    }[type]} equipped!**`);

    //Get item
    const item = message.author.player[type].tool;

    //Unequip
    message.author.player.inv.addItem(item);
    message.author.player[type].tool = undefined;

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  ${message.author}, You've unequipped the ${item}!**`);
};