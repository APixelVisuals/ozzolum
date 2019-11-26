module.exports = async ({ client, util, _ }, message) => {

    //Modules
    const errorCheck = require("syntax-error");
    const loadModules = require("../loadModules");

    //Restrict command
    if (message.author.id !== client.apixel.id) return;

    //Get params
    let path = message.content.split(" ").slice(1).join(" ");
    let fullPath = `${__dirname}/${path}.js`;

    //Check if file exists
    const file = await util.checkFile(fullPath);
    if (!file) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  That file doesn't exist!**`);

    //Check if code is valid
    const error = errorCheck(file, fullPath);
    if (error) return message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  Error Compiling:**\n\`\`\`\n${error}\`\`\``);

    //Delete module from cache
    try { delete require.cache[require.resolve(`./${path}`)]; }
    catch (err) { /* */ }

    //Load modules
    _.modules = loadModules();

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  Restarted module!**`);
};