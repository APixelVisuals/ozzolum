module.exports = async ({ classes, models, util, _ }, message, command, ownerOnly) => {

    //Get data
    const userData = await models.players.findById(message.author.id);
    if (!userData) {
        if (!ownerOnly) message.channel.send(`:x:  **|  ${message.author}, You haven't started a game yet! Start by saying \`o!start\`**`);
        return;
    }

    //Create player
    message.author.player = new classes.Player(userData);

    //Run command
    await command(_, message);

    //Save data
    await util.save(_, message.author.player.getData());
};