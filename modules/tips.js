module.exports = async ({ client, util, _ }, message) => {

    //Pre Module
    if (!util.cooldown(_, message)) return new Error("Cooldown not done");
    const { player } = message.author;

    //Get params
    let action = message.content.split(" ").slice(1).join(" ").toLowerCase().replace(/\s+/g, "");

    //Parse action
    if (["enable", "enabled", "on", "toggleon", "yes", "true"].includes(action)) action = true;
    else if (["disable", "disabled", "off", "toggleoff", "no", "false"].includes(action)) action = false;
    else return util.error(_, message, "You must specify `enable` or `disable`!");

    //Set action
    player.tips.disabled = action ? undefined : true;

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  ${message.author}, Tips have been ${action ? "enabled" : "disabled"}!**`);
};