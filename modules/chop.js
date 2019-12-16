module.exports = async ({ client, imageGenerators, util, Discord, loadingImage, simulatedChannel, _ }, message) => {

    //Pre Module
    if (!util.cooldown(_, message)) return new Error("Cooldown not done");
    const { player } = message.author;

    //Get location data
    const location = util.locations.find(l => l.channel === ((message.channel.id === client.testing.id && simulatedChannel) ? simulatedChannel : message.channel.id));
    if (!location) return;

    //Not exploring
    if (!player.explore.location) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You're not exploring!**`);

    //Not exploring here
    if (player.explore.location !== location.name) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You're exploring in ${client.channels.get(util.locations.find(l => l.name === player.explore.location).channel)}!**`);

    //Get area data
    const area = location.areas.find(a => a.name === player.explore.area.name);
    if (!area) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You haven't found an area!**`);

    //Cant chop here
    if (area.type !== "chopping") return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You can only ${{
        chopping: "chop",
        mining: "mine",
        digging: "dig",
        foraging: "forage"
    }[area.type]} in this area!**`);

    //Get tool data
    const tool = util.items.find(i => i.name === player.chopping.tool);
    if (!tool) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You don't have an Axe equipped!**`);

    //Cooldown not done
    if ((player.chopping.cooldown) && (player.chopping.cooldown > Date.now())) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You can't chop for another ${Math.ceil((player.chopping.cooldown - Date.now()) / 1000)} seconds!**`);

    //Set cooldown
    player.chopping.cooldown = Date.now() + 10000;

    //Remove durability
    const damage = Math.floor(Math.random() * (tool.maxDamage - tool.minDamage)) + tool.minDamage;
    player.explore.area.durability = player.explore.area.durability - damage;

    //Result
    let image;
    if (player.explore.area.durability <= 0) {

        //Add loot
        const loot = area.loot
            .filter(i => (Math.floor(Math.random() * 99) + 1) < i.frequency)
            .map(i => ({ name: i.name, amount: Math.floor(Math.random() * (i.max - i.min)) + i.min }));

        const result = player.inv.addItems(loot, true);

        //Add skill xp
        const xpGain = Math.floor(Math.random() * (10 - 5)) + 5;
        player.addXP("chopping", xpGain);

        //Remove area
        player.explore.area = {};

        //Generate image
        image = imageGenerators.gatheringLoot(_, message.author, location, { name: "Chopping", ...player.chopping }, result.added.concat(result.dropped), xpGain);

        //Stats
        await util.stats(_, "Trees Chopped");
    }
    else image = imageGenerators.gathering(_, message.author, location, area, "Chopping", { amount: player.explore.area.durability, maxAmount: area.durability }, damage);

    //Embed
    const embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}: ${location.name} Exploration`, message.author.displayAvatarURL)
        .setColor(await util.getColor(_, message.author.displayAvatarURL))
        .setImage(loadingImage);

    //Send
    const m = await message.channel.send(embed);

    //Generate gathering image
    m.edit(embed.setImage(await image));
};