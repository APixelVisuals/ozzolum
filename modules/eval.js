module.exports = async ({ client, modules, imageGenerators, util, classes, models, Discord, _ }, message) => {

    //Modules
    const chalk = require("chalk");

    //Restrict command
    if (message.author.id !== client.apixel.id) return;

    //Get params
    let code = message.content.split("eval").slice(1).join("eval");

    //Parse code
    code = `
        async function func() {
            ${code}
        }

        func();
    `;

    //Eval
    try {

        eval(code);

        message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  Done!**`);
    }
    catch (err) {

        console.log(chalk.red(err));

        message.channel.send(`${client.ozzolumEmojis["cross"]}  **|  Error has been logged to the console!**`);
    }
};