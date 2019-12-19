module.exports = async ({ client, imageGenerators, util, Discord, simulatedChannel, _ }, message) => {

    //Pre Module
    if (!util.cooldown(_, message)) return new Error("Cooldown not done");
    const { player } = message.author;

    //Get location data
    const location = util.locations.find(l => l.channel === ((message.channel.id === client.testing.id && simulatedChannel) ? simulatedChannel : message.channel.id));
    if (!location) return;

    //Not exploring
    if (!player.explore.location) return util.error(_, message, "You're not exploring!", "not exploring");

    //Not exploring here
    if (player.explore.location !== location.name) return util.error(_, message, `You're exploring in ${client.channels.get(util.locations.find(l => l.name === player.explore.location).channel)}!`, "not exploring here");

    //No areas found
    if (!player.explore.foundAreas.length) return util.error(_, message, "You haven't explored yet!", "no area found");

    //Get params
    let area = message.content.split(" ").slice(1).join(" ");
    if (!area) return util.error(_, message, "Where would you like to go?", "where to go");

    //Parse params
    area = player.explore.foundAreas.map(a => {

        const areaTags = a.toLowerCase().replace(/[^a-z ]/g, "").split(" ");
        const queryTags = [...new Set(area.toLowerCase().replace(/[^a-z ]/g, "").split(" "))].filter(t => t);

        const matches = areaTags.filter(t => queryTags.some(tt => t.startsWith(tt) || t.endsWith(tt))).length;

        return matches ? { area: a, matches } : null;
    }).filter(i => i).sort((a, b) => b.matches - a.matches)[0];
    if (!area) return util.error(_, message, "You haven't found that area!", "where to go");

    area = location.areas.find(a => a.name === area.area);

    //Set data
    player.explore.area.name = area.name;
    if (area.type !== "foraging") player.explore.area.durability = area.durability;
    player.explore.foundAreas = [];

    //Embed
    const embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}: ${location.name} Exploration`, message.author.displayAvatarURL)
        .setColor(await util.getColor(_, message.author.displayAvatarURL))
        .setImage("https://ozzolum.apixel.me/static/loading.gif");

    //Send
    const m = await message.channel.send(embed);

    //Generate gathering image
    m.edit(embed.setImage(await imageGenerators[area.type === "foraging" ? "gatheringForaging" : "gathering"](_, message.author, location, area, `${area.type.charAt(0).toUpperCase()}${area.type.substring(1)}`, { amount: player.explore.area.durability, maxAmount: player.explore.area.durability })));

    //Stats
    await util.stats(_, "Areas Explored");
};