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
    const areas = location.areas.filter(a => (Math.floor(Math.random() * 99) + 1) < a.frequency);
    player.explore.foundAreas = areas.map(a => a.name);

    //Embed
    const embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}: ${location.name} Exploration`, message.author.displayAvatarURL)
        .setColor(await util.getColor(_, message.author.displayAvatarURL))
        .setImage(loadingImage);

    //Send
    const m = await message.channel.send(embed);

    //Generate exploring image
    m.edit(embed.setImage(await imageGenerators.exploring(_, message.author, location, areas)));

    //Stats
    await util.stats(_, "Explorations");
};