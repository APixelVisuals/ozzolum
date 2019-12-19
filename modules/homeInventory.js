module.exports = async ({ client, util, classes, models, Discord, simulatedChannel, _ }, message) => {

    //Cooldown
    if (!util.cooldown(_, message)) return new Error("Cooldown not done");

    //Get params
    const PARAMS = message.content.split(" ").slice(1);

    let target = PARAMS.find(p => /<.*?>/.test(p));
    if (target) PARAMS.splice(PARAMS.indexOf(target), 1);
    target = target ? target.replace(/[<>@!]/g, "") : message.author.id;

    let page = PARAMS.find(p => parseInt(p));
    if (page) PARAMS.splice(PARAMS.indexOf(page), 1);
    page = parseInt(page) || 1;

    const searchQuery = PARAMS.join(" ");

    //Get location data
    const location = util.locations.find(l => l.channel === ((message.channel.id === client.testing.id && simulatedChannel) ? simulatedChannel : message.channel.id));
    if (!location) return;

    //Location isnt home
    if (location.name !== "Home") return util.error(_, message, `You can only view your Home Inventory in ${client.channels.get(util.locations.find(l => l.name === "Home").channel)}!`);

    //Parse params
    target = client.users.get(target);

    //No user
    if (!target) return util.error(_, message, "I couldn't find that user!");

    //Invalid page number
    if ((page < 1) || (isNaN(page))) page = 1;

    //Get home inv data
    const homeInvData = await models.homeInvs.findById(target.id);
    if (!homeInvData) return util.error(_, message, "That person hasn't started a game!");

    //Create inventory
    const homeInv = new classes.Inventory(_, homeInvData.inv.toObject());

    //Embed
    const embed = new Discord.RichEmbed()
        .setAuthor(`${target.tag}'s Home's Inventory`, target.displayAvatarURL)
        .setColor(await util.getColor(_, target.displayAvatarURL))
        .setImage("https://ozzolum.apixel.me/static/loading.gif");

    //Send
    const m = await message.channel.send(embed);

    //Generate inventory
    m.edit(embed.setImage(await homeInv.toImage(target, page, searchQuery)));

    //Stats
    await util.stats(_, "Home Inventory Checked");
};