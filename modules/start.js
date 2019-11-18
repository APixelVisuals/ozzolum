module.exports = async ({ imageGenerators, util, models, Discord, loadingImage, _ }, message) => {

    //Cooldown
    if (!await util.cooldown(_, message, 5000)) return;

    //Already started
    const userData = await models.players.findById(message.author.id);
    if (userData) return message.channel.send(`:x:  **|  ${message.author}, You've already started a game!**`);

    //Add to DB
    await models.players.create({
        _id: message.author.id,
        axe: "Stone Hatchet",
        pickaxe: "Stone Pickaxe",
        shovel: "Stone Shovel",
        weapon: "Stone Dagger"
    });

    //Embed
    const embed = new Discord.RichEmbed()
        .setTitle(`${message.author.tag}, Welcome to Ozzolum!`)
        .setDescription("We highly recommend reading the [Getting Started guide](https://idfk.com/wiki/???) on the wiki to learn about how Ozzolum works. But, if you'd rather not, you should at least read the rest of this embed")
        .setColor(util.colors.ozzolum)
        .addField("Commands", "View a list of commands by saying `o!help`")
        .addField("Quests", "Quests will guide you through the game. You can view your Quests by saying `o!quests`")
        .setImage(loadingImage);

    //Send
    const m = await message.channel.send(embed);
    m.edit(embed.setImage(await imageGenerators.welcome(_, message.author)));

    //Stats
    await util.stats(_, "Games Started");
};