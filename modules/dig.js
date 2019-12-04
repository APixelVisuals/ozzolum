module.exports = async ({ client, imageGenerators, util, Discord, loadingImage, simulatedChannel, _ }, message) => {

    //Pre Module
    if (!await util.cooldown(_, message, 5000, true)) return;
    const { player } = message.author;

    //Get location data
    const location = util.locations.find(l => l.channel === ((message.channel.id === client.testing.id && simulatedChannel) ? simulatedChannel : message.channel.id));
    if (!location) return;

    //Not a location for digging
    if (!location.dig) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You can't dig here!**`);

    //Get tool data
    const tool = util.items[player.digging.tool];
    if (!tool) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You don't have a Shovel equipped!**`);

    //Cooldown not done
    if ((player.digging.cooldown) && (player.digging.cooldown > Date.now())) {
        const cooldown = (player.digging.cooldown - Date.now()) / 1000;
        return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You can't dig for another ${Math.floor(cooldown % 3600 / 60)} minutes and ${Math.floor(cooldown % 3600 % 60)} seconds!**`);
    }

    //Set cooldown
    player.digging.cooldown = Date.now() + 300000;

    //Add loot
    const loot = location.dig.loot
        .filter(i => (Math.floor(Math.random() * 99) + 1) < i.frequency)
        .map(i => ({ name: i.name, amount: Math.floor(Math.random() * (i.max - i.min)) + i.min }));

    loot.forEach(i => player.inv.addItem(i.name, i.amount));

    //Add skill xp
    const xpGain = Math.floor(Math.random() * (10 - 5)) + 5;
    player.addXP("digging", xpGain);

    //Embed
    const embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}: ${location.name}`, message.author.displayAvatarURL)
        .setColor(await util.getColor(_, message.author.displayAvatarURL))
        .setImage(loadingImage);

    //Send
    const m = await message.channel.send(embed);

    //Generate gathering image
    m.edit(embed.setImage(await imageGenerators.gathering(_, message.author, location, { name: "Digging", ...player.digging }, loot, xpGain)));

    //Stats
    await util.stats(_, "Ground Dug");
};