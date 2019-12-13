module.exports = async ({ client, imageGenerators, util, Discord, loadingImage, simulatedChannel, _ }, message) => {

    //Pre Module
    if (!util.cooldown(_, message)) return new Error("Cooldown not done");
    const { player } = message.author;

    //Get location data
    const location = util.locations.find(l => l.channel === ((message.channel.id === client.testing.id && simulatedChannel) ? simulatedChannel : message.channel.id));
    if (!location) return;

    //Not a location for exploring
    if (!location.areas) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You can't explore here!**`);

    //Not exploring here
    if ((player.explore.location) && (player.explore.location !== location.name)) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You're exploring in ${client.channels.get(util.locations.find(l => l.name === player.explore.location).channel)}!**`);

    //Cooldown not done
    if ((player.explore.cooldown) && (player.explore.cooldown > Date.now())) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You can't explore for another ${Math.ceil((player.explore.cooldown - Date.now()) / 1000)} seconds!**`);

    //Set cooldown
    player.explore.cooldown = Date.now() + 15000;

    //Set location
    player.explore.location = location.name;

    //Find area
    const totalChances = location.areas.reduce((t, a) => t + a.chances, 0);
    const chance = Math.floor(Math.random() * (totalChances - 1)) + 1;
    const areaChances = [];
    location.areas.forEach(a => areaChances.push({ area: a, value: (areaChances[areaChances.length - 1] ? areaChances[areaChances.length - 1].value : 0) + a.chances }));
    const area = areaChances.find(a => chance < a.value).area;
    player.explore.area.name = area.name;
    player.explore.area.durability = area.durability;

    //Embed
    const embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}: ${location.name} Exploration`, message.author.displayAvatarURL)
        .setColor(await util.getColor(_, message.author.displayAvatarURL))
        .setImage(loadingImage);

    //Send
    const m = await message.channel.send(embed);

    //Generate gathering image
    m.edit(embed.setImage(await imageGenerators.gathering(_, message.author, player.explore.location, player.explore.area.name, `${area.type.charAt(0).toUpperCase()}${area.type.substring(1)}`, { amount: player.explore.area.durability, maxAmount: player.explore.area.durability })));

    //Stats
    await util.stats(_, "Areas Found");
};