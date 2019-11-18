module.exports = async ({ client, util, _ }, message) => {

    //Cooldown
    if (!await util.cooldown(_, message, 2000)) return;

    //Get params
    let type = message.content.split(" ").slice(1).join(" ").toLowerCase().replace(/\s+/g, "");

    //No type
    if (!type) return message.channel.send(`:x:  **|  ${message.author}, What type of item would you like to unequip?**`);

    //Parse type
    if (["axe", "hatchet"].includes(type)) type = "axe";
    else if (["pickaxe", "pick"].includes(type)) type = "pickaxe";
    else if (["shovel"].includes(type)) type = "shovel";
    else if (["fishingrod", "fishingpole"].includes(type)) type = "fishingRod";
    else if (["weapon", "sword"].includes(type)) type = "weapon";
    else return message.channel.send(`:x:  **|  ${message.author}, That item type doesn't exist!**`);

    //Not equipped
    if (!message.author.player[type]) return message.channel.send(`:x:  **|  ${message.author}, You don't have ${{
        axe: "an Axe",
        pickaxe: "a Pickaxe",
        shovel: "a Shovel",
        fishingRod: "a Fishing Rod",
        weapon: "a Weapon"
    }[type]} equipped!**`);

    //Get item
    const item = message.author.player[type];

    //Unequip
    message.author.player.inv.addItem(item);
    message.author.player[type] = undefined;

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  ${message.author}, You've unequipped the ${item}!**`);
};