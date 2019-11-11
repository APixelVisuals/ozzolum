module.exports = async ({ models, modules, util, _ }, message) => {

    //Check for DMs
    if (message.channel.type === "dm") return;

    //Check for bots
    if (message.author.bot) return;

    //Get data
    message.author.data = await models.users.findByIdAndUpdate(message.author.id, {}, { upsert: true, setDefaultsOnInsert: true, new: true });

    //Match Command
    const simplifiedMessage = message.content.toLowerCase().replace(/\s+/g, "");
    let command = util.commands
        .find(c => c.inputs
            .some(i => (
                simplifiedMessage === `${c.ownerOnly ? "o#" : "o!"}${i}` ||
                message.content.toLowerCase().startsWith(`${c.ownerOnly ? "o#" : "o!"}${i} `)
            ))
        );
    command = command && modules[command.file];

    if (command) command(_, message);

    //Save docs
    await util.save(_, message.author.data);
};