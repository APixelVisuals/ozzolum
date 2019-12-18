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
const _ = {

    //Main
    client,
    modules,
    imageGenerators: modules.imageGenerators,
    util: modules.misc,
    classes: modules.classes,
    models: loadModels(),

    //Modules
    Discord,

    //Other
    cooldowns: new Map(),
    stats: {},
    nextUploadChannel: 0
};

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
    client.testing = client.channels.get("643194564210982912");

    client.ozzolumEmojis = {};
    client.realmOfOzzolum.emojis.array().forEach(e => client.ozzolumEmojis[e.name] = e);

    client.cheapImageHosting = client.guilds.get("643870259928891418");
    client.uploadChannels = client.cheapImageHosting.channels.array();
});

//Message
client.on("message", message => _.modules.message(_, message));

//Login
client.login(process.env.TOKEN);

//Stats
setInterval(async () => {

    const date = new Date();
    const stats = await _.models.stats.findByIdAndUpdate({ year: date.getFullYear(), month: date.getMonth() + 1 }, {}, { upsert: true, setDefaultsOnInsert: true, new: true });

    for (let s in _.stats) {

        if (!stats.stats.find(ss => ss.name === s)) stats.stats.push({ name: s, count: 0 });

        const stat = stats.stats.find(ss => ss.name === s);
        stat.count = stat.count + _.stats[s];
    }

    _.stats = {};

    await _.util.save(_, stats);
}, 60000);