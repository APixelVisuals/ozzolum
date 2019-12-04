module.exports = async ({ client, classes, models, util, _ }, message, command, ownerOnly) => {

    //Get data
    const userData = await models.players.findById(message.author.id);
    if (!userData) {
        if (!ownerOnly) message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You haven't started a game yet! Start by saying \`o!start\`**`);
        return;
    }

    //Previous command not done
    if (message.author.player) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  Please wait until your previous command is finished before using another one!**`);

    //Create player
    message.author.player = new classes.Player(_, userData);

    //Run command
    const result = await command(_, message);

    //Save data
    if (!(result instanceof Error)) await util.save(_, message.author.player.getData());

    //Delete player
    delete message.author.player;
};