module.exports = client => {

    //Modules
    const readdir = require("directory-tree");
    const mongoose = require("mongoose");

    //Get builders
    const builders = readdir(process.env.DEV === "true" ? "/home/apixel/Documents/ozzolum/models" : "/root/ozzolum/models").children
        .map(b => ({ name: b.name.replace(/\.js/g, ""), data: require(b.path) }))
        .filter(b => b.name !== "load");

    //Build
    const models = {};
    builders.forEach(b => {

        const schema = new mongoose.Schema(b.data, {
            collection: b.name,
            strict: "throw"
        });

        models[b.name] = mongoose.model(b.name, schema);
    });

    return models;
};