module.exports = async ({ modules, util, _ }, message) => {

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

    if (command) {
        if (command.basic) modules[command.file](_, message);
        else util.command(_, message, modules[command.file], command.ownerOnly);
    }
};