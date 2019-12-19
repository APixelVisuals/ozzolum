module.exports = async ({ client, util, simulatedChannel, _ }, message) => {

    //Pre Module
    if (!util.cooldown(_, message)) return new Error("Cooldown not done");
    const { player } = message.author;

    //Get location data
    const location = util.locations.find(l => l.channel === ((message.channel.id === client.testing.id && simulatedChannel) ? simulatedChannel : message.channel.id));
    if (!location) return;

    //Not exploring
    if (!player.explore.location) return util.error(_, message, "You're not exploring!", "not exploring");

    //Not exploring here
    if (player.explore.location !== location.name) return util.error(_, message, `You're exploring in ${client.channels.get(util.locations.find(l => l.name === player.explore.location).channel)}!`);

    //Set data
    player.explore.location = undefined;
    player.explore.foundAreas = [];
    player.explore.area = {};

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  ${message.author}, You've left the ${location.name}!**`);

    //Stats
    await util.stats(_, "Explorations Ended");
};