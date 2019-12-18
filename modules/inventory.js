module.exports = async ({ client, util, classes, models, Discord, _ }, message) => {

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

    //Parse params
    target = client.users.get(target);

    //No user
    if (!target) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, I couldn't find that user!**`);

    //Invalid page number
    if ((page < 1) || (isNaN(page))) page = 1;

    //Get player
    const player = target.id === message.author.id ?
        message.author.player :
        new classes.Player(_, await models.players.findById(target.id));

    //No player
    if (player.noPlayer) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, That person hasn't started a game!**`);

    //Embed
    const embed = new Discord.RichEmbed()
        .setAuthor(`${target.tag}'s Inventory`, target.displayAvatarURL)
        .setColor(await util.getColor(_, target.displayAvatarURL))
        .setImage("https://ozzolum.apixel.me/static/loading.gif");

    //Send
    const m = await message.channel.send(embed);

    //Generate inventory
    m.edit(embed.setImage(await player.inv.toImage(target, page, searchQuery)));

    //Stats
    await util.stats(_, "Inventory Checked");
};