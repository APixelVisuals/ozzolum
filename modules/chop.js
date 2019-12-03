module.exports = async ({ client, imageGenerators, util, Discord, loadingImage, simulatedChannel, _ }, message, player) => {

    //Cooldown
    if (!await util.cooldown(_, message, 5000, true)) return new Error("Cooldown not done");

    //Get location data
    const location = util.locations.find(l => l.channel === ((message.channel.id === client.testing.id && simulatedChannel) ? simulatedChannel : message.channel.id));
    if (!location) return;

    //Not a location for chopping
    if (!location.chop) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You can't chop here!**`);

    //Get tool data
    const tool = util.items[player.chopping.tool];
    if (!tool) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You don't have an Axe equipped!**`);

    //Cooldown not done
    if ((player.chopping.cooldown) && (player.chopping.cooldown > Date.now())) {
        const cooldown = (player.chopping.cooldown - Date.now()) / 1000;
        return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You can't chop for another ${Math.floor(cooldown % 3600 / 60)} minutes and ${Math.floor(cooldown % 3600 % 60)} seconds!**`);
    }

    //Set cooldown
    player.chopping.cooldown = Date.now() + 300000;

    //Add loot
    const loot = location.chop.loot
        .filter(i => (Math.floor(Math.random() * 99) + 1) < i.frequency)
        .map(i => ({ name: i.name, amount: Math.floor(Math.random() * (i.max - i.min)) + i.min }));

    loot.forEach(i => player.inv.addItem(i.name, i.amount));

    //Embed
    const embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}: ${location.name}`, message.author.displayAvatarURL)
        .setColor(await util.getColor(_, message.author.displayAvatarURL))
        .setImage(loadingImage);

    //Send
    const m = await message.channel.send(embed);

    //Generate gathering image
    m.edit(embed.setImage(await imageGenerators.gathering(_, message.author, location, loot)));

    //Stats
    await util.stats(_, "Trees Chopped");
};