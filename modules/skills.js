module.exports = async ({ client, util, classes, models, Discord, loadingImage, _ }, message) => {

    //Pre Module
    if (!await util.cooldown(_, message, 5000)) return;

    //Get params
    let target = message.content.split(" ").slice(1).join(" ").replace(/[<>@!]/g, "") || message.author.id;

    //Parse params
    target = client.users.get(target);

    //No user
    if (!target) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, I couldn't find that user!**`);

    //Get player
    const player = target.id === message.author.id ?
        message.author.player :
        new classes.Player(_, await models.players.findById(target.id));

    //No player
    if (player.noPlayer) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, That person hasn't started a game!**`);

    //Embed
    const embed = new Discord.RichEmbed()
        .setAuthor(`${target.tag}'s Skills`, target.displayAvatarURL)
        .setColor(await util.getColor(_, target.displayAvatarURL))
        .setImage(loadingImage);

    //Send
    const m = await message.channel.send(embed);

    //Generate skills
    m.edit(embed.setImage(await player.skillsImage(target)));

    //Stats
    await util.stats(_, "Skills Checked");
};