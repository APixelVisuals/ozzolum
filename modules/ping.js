module.exports = async ({ client, util, _ }, message) => {

    //Modules
    const mongoose = require("mongoose");

    //Cooldown
    if (!util.cooldown(_, message)) return new Error("Cooldown not done");

    //Get command params
    const type = message.content.toLowerCase().replace(/\s+/g, "").endsWith("ping") ? "ping" : "pong";

    //Define pings
    const pings = {};

    //Connection to Discord
    pings.websocket = Math.round(client.ping);

    //Message sending
    let start = Date.now();
    const m = await message.channel.send(`:ping_pong:  **|  ${type === "ping" ? "Pinging" : "Ponging"}...**`);
    pings.messages = Date.now() - start;

    //Database ping
    start = Date.now();
    await mongoose.connection.db.admin().ping();
    pings.database = Date.now() - start;

    //Edit message
    m.edit(`:ping_pong:  **|  ${type === "ping" ? "Pong" : "Ping"}!\n\nConnection to Discord: ${pings.websocket} ms\nMessage Sending: ${pings.messages} ms\nDatabase Ping: ${pings.database} ms**`);

    //Stats
    await util.stats(_, "Bot Pinged");
};