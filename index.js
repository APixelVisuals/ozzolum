//Modules
require("dotenv").config({ path: `${__dirname}/.env` });
const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const chalk = require("chalk");
const loadModules = require("./loadModules");
const loadModels = require("./models/load");

//Build objects
console.log(chalk.magenta("Building Objects..."));

const modules = loadModules();
const _ = Object.assign({
    client,
    modules,
    models: loadModels(),
    cooldowns: new Map()
}, modules.misc);

_._ = _;

console.log(chalk.green("Built Objects!"));

//MongoDB
console.log(chalk.magenta("Connecting to MongoDB..."));

mongoose.connect(`mongodb://${process.env.IP}`, {
    dbName: process.env.DEV === "true" ? "ozzolittle" : "ozzolum",
    user: "root",
    pass: process.env.DB_PASSWORD
});

console.log(chalk.green("Connected to MongoDB!"));

//Promise Rejections
process.on("unhandledRejection", reason => console.log(chalk.red(reason.stack)));

//Websocket errors
client.on("error", () => { });

//Ready
client.on("ready", async () => {

    //Log
    console.log(chalk.green("Bot online!"));

    //Set Activity
    client.user.setActivity("say o!help");

    //Build client: Misc
    client.ozzolum = client.users.get("643234390058598400");
    client.apixel = client.users.get("196795781410324480");
    client.realmOfOzzolum = client.guilds.get("643180606615715870");
    client.changeLog = client.channels.get("643194322807685140");
});

//Message
client.on("message", message => client.modules.message(client, message));

//Member join
client.on("guildMemberAdd", member => client.modules.memberJoin.main(client, member));

//Login
client.login(process.env.TOKEN);