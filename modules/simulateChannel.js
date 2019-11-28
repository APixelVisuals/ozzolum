module.exports = async ({ client, _ }, message) => {

    //Restrict command
    if (message.author.id !== client.apixel.id) return;

    //Restrict to testing bot
    if (process.env.DEV !== "true") return;

    //Get params
    const channel = message.content.split(" ").slice(1).join(" ").replace(/[<>#]/g, "");

    //Set simulated channel
    _.simulatedChannel = channel;

    //Send
    message.channel.send(`${client.ozzolumEmojis["checkmark"]}  **|  The simulated channel has been set!**`);
};