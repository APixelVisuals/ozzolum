module.exports = async ({ client, classes, models, modules, util, _ }, message) => {

    //Check for DMs
    if (message.channel.type === "dm") return;

    //Check for bots
    if (message.author.bot) return;

    //Match Command
    const simplifiedMessage = message.content.toLowerCase().replace(/\s+/g, "");
    const command = util.commands
        .find(c => c.inputs
            .some(i => (
                simplifiedMessage === `${c.ownerOnly ? "o#" : "o!"}${i}` ||
                message.content.toLowerCase().startsWith(`${c.ownerOnly ? "o#" : "o!"}${i} `)
            ))
        );

    //No command
    if (!command) return;

    //Previous command not done
    if (message.author.player) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  Please wait until your previous command is finished before using another one!**`);

    if (!command.basic) {

        //Get data
        const userData = await models.players.findById(message.author.id);
        if (!userData) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  ${message.author}, You haven't started a game yet! Start by saying \`o!start\`**`);

        //Create player
        message.author.player = new classes.Player(_, userData);
    }

    //Run command
    const result = await modules[command.file](_, message);

    //Save data
    if (!command.basic) await util.save(_, message.author.player.getData());

    //Set cooldown
    if (!(result instanceof Error)) util.setCooldown(_, message);

    //Delete player
    delete message.author.player;
};